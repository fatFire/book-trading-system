import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Flex, Text, } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Redirect, useHistory } from 'react-router';
import Loading from '../../component/Loading';
import User from '../../context/UserContex';
import { getMyOrders } from './api';

export default function MyOrders() {
  const { user } = User.useContainer();
  const token = window.localStorage.getItem('jwt');

  const { isLoading, data: orders } = useQuery(
    ['myorders'],
    () => getMyOrders(user.id, { token }),
    {
      enabled: !!user.id,
    }
  );

  if (!user.id) {
    return <Redirect to="/signin" />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      <Heading w="500px" m="50px auto" textAlign="center">
        My Orders
      </Heading>
      <Table variant="simple" w="90%" m="0 auto">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Address</Th>
            <Th>Card</Th>
            <Th>Books</Th>
            <Th>Total Amount(￡)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map(order => (
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
              <Td>
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
