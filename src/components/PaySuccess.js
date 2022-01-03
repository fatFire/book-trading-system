import React, { useState, useEffect } from 'react';
import {
  Flex,
  Avatar,
  IconButton,
  Text,
  Link,
  Icon,
  Box,
  Grid,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  Heading,
  Image,
  Select,
  GridItem,
  Button,
  FormControl,
  FormLabel,
  createStandaloneToast,
} from '@chakra-ui/react';
import { AiOutlineCheck, AiOutlineCheckCircle } from 'react-icons/ai';
import { useHistory } from 'react-router';
import ClosePage from './ClosePage';

export default function PaySuccess() {
  const history = useHistory()
  const order = history.location.state?.order

  return (
    <Box mt="100px">
      <ClosePage/>
      <Flex justifyContent="center" alignItems="center" marginTop="250px">
        <AiOutlineCheckCircle fontSize="50px" color="#68D391"/> 
        <Text fontSize="30px" fontWeight="600" ml="20px">Payment Success</Text>
      </Flex>
      <Flex flexWrap="wrap" w="900px" m="30px auto 0" fontSize="24px" >
        <Text w="100%" mb="10px"><span style={{fontWeight: 600}}>Order ID</span>: {order.id}</Text>
        <Flex w="50%" flexDirection="column">
          <Text><span style={{fontWeight: 600}}>Address</span>: {order.address}</Text>
          <Text><span style={{fontWeight: 600}}>Card Number</span>: {order.cardnumber}</Text>
          <Text><span style={{fontWeight: 600}}>Card Name</span>: {order.cardname}</Text>
          <Text><span style={{fontWeight: 600}}>CVV</span>: {order.cvv}</Text>
        </Flex>
        <Flex ml="2%" w="48%" flexDirection="column">
          <Text><span style={{fontWeight: 600}}>Books</span>: </Text>
          {order.books.map(book => (
            <li key={book.id}>{book.bookname}</li>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}
