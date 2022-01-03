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
  Flex,
  Button,
  Text
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Redirect, useHistory } from 'react-router';
import axios from 'axios';
import Loading from './Loading';
import User from '../context/UserContex';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function MyOrders() {
  const user = User.useContainer();
  const history = useHistory();
  console.log(user.user);
  const token = JSON.parse(window.localStorage.getItem('jwt'));

  const { isLoading, data: orders } = useQuery(['myorders'], () =>
    axios.get(
      `http://localhost:1337/orders?users_permissions_user=${user.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    ),
    {
      enabled: !!token
    }
  );

  const handleClose = () => {
    history.push('/');
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
        My Orders
      </Heading>
      <Table variant="simple" w="1200px" m="0 auto">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Address</Th>
            <Th>Card</Th>
            <Th w="400px">Books</Th>
            <Th>Total Amount(￡)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders?.data.map(order => (
            <Tr key={order.id}>
              <Td>
                <Text w="100px" isTruncated>
                  {order.id}
                </Text>
              </Td>
              <Td>
                <Text w="100px" isTruncated>
                  {order.address}
                </Text>
              </Td>
              <Td>
                <Flex flexDirection="column" justifyContent="space-between">
                  <div>Card Number: {order.cardnumber}</div>
                  <div>Card Name: {order.cardname}</div>
                  <div>CVV: {order.cvv}</div>
                </Flex>
              </Td>
              <Td >
                <Flex flexDirection="column" justifyContent="space-between">
                  {order.books.map(book => (
                    <Text key={book.id} w="300px" isTruncated>
                      {book.bookname}
                    </Text>
                  ))}
                </Flex>
              </Td>
              <Td>{order.totalamount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
