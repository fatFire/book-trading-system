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
import { findAllBooks, deleteBook } from '../api/api';

export default function YourBooks() {
  const user = User.useContainer();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const history = useHistory();
  const queryClient = useQueryClient()
  console.log(user.user);
  const token = JSON.parse(window.localStorage.getItem('jwt'));
  console.dir(findAllBooks)

  const { isLoading, data: books } = useQuery(['mybooks'], () =>
    axios.get(`http://localhost:1337/books?users_permissions_user=${user.user.id}`),
    {
      enabled: !!token
    }
  );

  const handleClose = () => {
    history.push('/');
  };

  const handleDelete = id => {
    deleteBookMutation.mutate(id)
  };

  const deleteBookMutation = useMutation(deleteBook, {
    onSuccess: () => {
      queryClient.invalidateQueries('allbooks')
    }
  })

  const handleAddBook = () => {
    history.push('addabook')
  }

  const handleModifyBook = (book) => {
    history.push('modifybook', {
      book
    })
  }

  console.log(books);

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
        All My Posted Books
      </Heading>
      <Box w="1200px" m="0 auto">
        <Flex justifyContent="flex-end">
          <Button colorScheme="blue" onClick={handleAddBook}>Add a Book</Button>
        </Flex>
        <Table variant="simple" >
          <Thead>
            <Tr>
              <Th>Book Name</Th>
              <Th>Category</Th>
              <Th>Book Condition</Th>
              <Th>Price(￡)</Th>
              {/* <Th>Discription</Th> */}
              <Th>Book Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {books?.data.map(book => (
              <Tr key={book.id}>
                <Td>{book.bookname}</Td>
                <Td>{book.category?.name || "unknow"}</Td>
                <Td>{book.condition}</Td>
                <Td>{book.price}</Td>
                {/* <Td>{book.description || 'No Description'}</Td> */}
                <Td>{book.status}</Td>
                <Td>
                  <Flex>
                    <Button onClick={() => {
                        onOpen()
                        handleDelete.bind(null, book.id) 
                      }} mr="10px" colorScheme="red">
                      Delete
                    </Button>
                    <Button onClick={handleModifyBook.bind(null, book)} colorScheme="blue">
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
          Have you decided to delete this book?
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
