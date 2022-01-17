import React, { useState } from 'react';
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
import Loading from '../../component/Loading';
import UserContex from '../../context/UserContex';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { getMyBooks, deleteBook } from './api';

export default function MyBooks() {
  const { user } = UserContex.useContainer();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [id, setId] = useState(0)
  const history = useHistory();
  const queryClient = useQueryClient()
  const token = window.localStorage.getItem('jwt')
  
  const { isLoading, data: books } = useQuery(['mybooks'], () => getMyBooks(user.id, { token }),
    {
      enabled: !!user.id
    }
  );
  console.log(books)
  

  
  const deleteBookMutation = useMutation((id) => {
    console.log(id)
    return deleteBook(id, { token })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('allbooks')
      queryClient.invalidateQueries('mybooks')
    }
  })

  const handleDelete = function() {
    console.log(id)
    onClose()
    deleteBookMutation.mutate(id)
  };


  const handleAddBook = () => {
    history.push('addabook')
  }

  const handleModifyBook = (book) => {
    history.push('modifybook', {
      book
    })
  }

  if (isLoading) {
    return <Loading />;
  }

  if(!user.id) {
    return  <Redirect to="/signin" />
  }

  return (
    <Box>
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
            {books.map(book => (
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
                        setId(book.id)
                        onOpen()
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
