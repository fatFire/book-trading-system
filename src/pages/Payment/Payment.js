import React, { useState } from 'react';
import {
  Flex,
  Avatar,
  IconButton,
  Text,
  Link,
  Icon,
  Box,
  Heading,
  Image,
  Select,
  SimpleGrid,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Button,
  createStandaloneToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import ClosePage from '../../component/ClosePage';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import UserContext from '../../context/UserContex'
import { createOrder, deleteBookFromCart } from './api';


export default function Payment(props) {
  const history = useHistory();
  const { cart, setCart } = CartContext.useContainer();
  const { user } = UserContext.useContainer()
  const token = window.localStorage.getItem('jwt');;
  const standaloneToast = createStandaloneToast();
  const formik = useFormik({
    initialValues: {
      address: '',
      cardnumber: '',
      cardname: '',
      cvv: '',
    },
    onSubmit: null,
  });

  const books = history.location.state.books?.map(book => book.id);
  const totalamount = history.location.state.totalamount;

  const deleteBook = function (ids) {
    const set = new Set(ids)
    const books = cart.books.filter(book => !set.has(book.id))

    const data = {
      books
    };
    return deleteBookFromCart(cart.id, data, { token })
  };

  const deleteBookMmutation = useMutation(deleteBook, {
    onSuccess: (data) => {
      setCart(data.data)
      history.push("/paysuccess")
    }}
  );


  const mutationFn = async () => {
    const data = formik.values;
    data['totalamount'] = totalamount;
    data['books'] = books;
    data['users_permissions_user'] = user.id

    try {
      const order = await createOrder(data, {token})
      deleteBook(books)
      return order
    } catch(e) {
      throw e
    }
  };

  const mutation = useMutation(mutationFn, {
    onSuccess: (data) => {
      history.push("/paysuccess", {
        order: data
      })
    }
  });

  const getRandomReturn = function(ratio) {
    const randomNum = Math.random()
    if(randomNum < ratio) return true
    else return false
  }

  const handleSubmit = () => {
    let flag = getRandomReturn(0.9)
    if(flag) {
      mutation.mutate();
    } else {
      standaloneToast({
        title: 'Payment Error',
        description: 'Please Check Your Card Information',
        status: 'error',
        position: 'top',
        isClosable: true,
        duration: 9000,
      });
    }

  };

  return (
    <Box>
      <ClosePage />
      <Heading w="500px" m="50px auto" textAlign="center">
        Make Payment
      </Heading>
      <SimpleGrid columns={2} spacing={10} w="50%" m="0 auto">
        <Box>
          <FormControl id="bookname" isRequired>
            <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
              Shipping Address:
            </FormLabel>
            <Textarea
              placeholder="Enter your address"
              {...formik.getFieldProps('address')}
            />
          </FormControl>
        </Box>
        <Flex direction="column" justifyContent="space-between">
          <FormControl id="cardname" isRequired mb={5}>
            <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
              Name on Card:
            </FormLabel>
            <Input
              placeholder="Enter Name on Card"
              {...formik.getFieldProps('cardname')}
            />
          </FormControl>
          <FormControl id="cardnumber" isRequired mb={5}>
            <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
              Card No. :
            </FormLabel>
            <Input
              placeholder="Enter Card Number "
              {...formik.getFieldProps('cardnumber')}
            />
          </FormControl>
          <FormControl id="cvv" isRequired mb={5}>
            <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
              CVV:
            </FormLabel>
            <Input placeholder="Enter CVV" {...formik.getFieldProps('cvv')} />
          </FormControl>
          <Text fontSize="lg" fontWeight="semibold" mb={5} alignSelf="flex-end">
            Total Amount: {totalamount} ￡
          </Text>
          <Button
            width="50%"
            minWidth="160px"
            size="lg"
            colorScheme="red"
            alignSelf="flex-end"
            onClick={handleSubmit}
          >
            Make Payment
          </Button>
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
