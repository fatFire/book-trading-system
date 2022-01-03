import React from 'react';
import {
  Box,
  Heading,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Redirect, useHistory } from 'react-router';
import axios from 'axios';
import Loading from './Loading';
import User from '../context/UserContex';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { findUsers, deleteUser } from '../api/api';

export default function AllUsers() {
  const user = User.useContainer();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const history = useHistory();
  const queryClient = useQueryClient()
  console.log(user.user);
  const token = JSON.parse(window.localStorage.getItem('jwt'));
  console.dir(findUsers)

  const { isLoading, data: users } = useQuery(['allusers'], () => findUsers());

  const handleClose = () => {
    history.push('/');
  };

  const handleDelete = id => {
    deleteUserMutation.mutate(id)
  };

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('allusers')
    }
  })

  const handleAddUser = () => {
    history.push('adduser')
  }

  const handleModifyUser = (user) => {
    history.push('modifyuser', {
      user
    })
  }

  console.log(users);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      {!!token ? null : <Redirect to="/signin" />}
      <IconButton
        position="fixed"
        right="10px"
        top="10px"
        colorScheme="blue"
        aria-label="close"
        icon={<AiOutlineCloseCircle fontSize="26px" />}
        onClick={handleClose}
      />
      <Heading w="500px" m="50px auto" textAlign="center">
        All Users
      </Heading>
      <Box w="1200px" m="0 auto">
        <Flex justifyContent="flex-end">
          <Button colorScheme="blue" onClick={handleAddUser}>Add a User</Button>
        </Flex>
        <Table variant="simple" >
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.data.map(user => (
              <Tr key={user.id}>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                
                <Td>
                  <Flex>
                    <Button onClick={() => {
                        onOpen()
                        handleDelete.bind(null, user.id) 
                      }} mr="10px" colorScheme="red">
                      Delete
                    </Button>
                    <Button onClick={handleModifyUser.bind(null, user)} colorScheme="blue">
                      Modify
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          Have you decided to delete this user?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='red' onClick={handleDelete}>Yes, delete it</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
