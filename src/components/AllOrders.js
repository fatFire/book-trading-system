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
  Text,
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
import { findOrders } from '../api/api';
import { deleteOrder } from '../api/api';


export default function AllOrders() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = User.useContainer();
  const history = useHistory();
  const queryClient = useQueryClient()
  console.log(user.user);
  const token = JSON.parse(window.localStorage.getItem('jwt'));

  const { isLoading, data: orders } = useQuery(['allorders'], () =>
    findOrders()
  );
  

  const handleClose = () => {
    history.push('/');
  };

  const handleDelete = id => {
    deleteOrderMutation.mutate(id)
  };
  
  const deleteOrderMutation = useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('allorders')
    }
  })

  const handleModifyOrder = (order) => {
    history.push('modifyorder', {
      order
    })
  };

  console.log(orders);

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
        All Orders
      </Heading>
      <Box w="1400px" m="0 auto">
        {/* <Flex justifyContent="flex-end">
          <Button colorScheme="blue" onClick={handleAddOrders}>
            Add a Book
          </Button>
        </Flex> */}
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>User ID</Th>
              <Th>Address</Th>
              <Th>Card</Th>
              <Th>Books</Th>
              <Th>Total Amount(￡)</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders?.data.map(order => (
              <Tr key={order?.id}>
                <Td>
                  <Text w="100px" isTruncated>
                    {order?.id}
                  </Text>
                </Td>
                <Td>
                  <Text w="100px" isTruncated>
                    {order['users_permissions_user']?.id}
                  </Text>
                </Td>
                <Td>
                  <Text w="100px" isTruncated>{order.address}</Text>
                </Td>
                <Td>
                  <Flex flexDirection="column" justifyContent="space-between">
                    <div>Card Number: {order.cardnumber}</div>
                    <div>Card Name: {order.cardname}</div>
                    <div>CVV: {order.cvv}</div>
                  </Flex>
                </Td>
                <Td>
                  <Flex flexDirection="column" justifyContent="space-between">
                    {order.books.map(book => (
                      <Text key={book.id} w="100px" isTruncated>
                        {book.bookname}
                      </Text>
                    ))}
                  </Flex>
                </Td>
                <Td>{order.totalamount}</Td>
                <Td>
                  <Flex>
                    <Button
                      onClick={() => {
                        onOpen()
                        handleDelete.bind(null, order.id) 
                      }}
                      mr="10px"
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={handleModifyOrder.bind(null, order)}
                      colorScheme="blue"
                    >
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
          Have you decided to delete this order?
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
