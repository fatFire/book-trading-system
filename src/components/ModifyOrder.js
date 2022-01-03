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
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { Wrap } from './Wrap';
import { Redirect } from 'react-router';
import User from '../context/UserContex';

export default function ModifyOrder() {
  const toast = createStandaloneToast();
  const history = useHistory();
  const user = User.useContainer();
  const order = history.location.state.order;
  console.log(order);
  console.log(user);
  const token = JSON.parse(window.localStorage.getItem('jwt'));
  const { data: books } = useQuery('books', () =>
    axios.get('http://localhost:1337/books?status=available&isDeleted=false')
  );

  const formik = useFormik({
    initialValues: {
      address: order.address,
      // books: order.books,
      cardname: order.cardname,
      cardnumber: order.cardnumber,
      cvv: order.cvv,
      totalamount: order.totalamount,
    },
    onSubmit: null,
  });

  const mutationFn = () => {
    const formData = {};
    return axios.put(`http://localhost:1337/books/${order.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const mutation = useMutation(mutationFn, {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Successfully modified a order',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      history.goBack();
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  const handleClose = () => {
    history.goBack();
  };

  return (
    <Wrap pt="100px">
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
      <Heading fontSize="26px" w="500px" m="0 auto 30px" textAlign="center">
        Modify an Order
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" w="50%" m="0 auto" gap={10}>
        <FormControl id="address" isRequired>
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Address:
          </FormLabel>
          <Input
            placeholder="Enter Address"
            size="lg"
            {...formik.getFieldProps('address')}
          />
        </FormControl>
        <FormControl id="cardname" isRequired>
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Cardname:
          </FormLabel>
          <Input
            placeholder="Enter Cardname"
            size="lg"
            {...formik.getFieldProps('cardname')}
          />
        </FormControl>
        <FormControl id="cardnumber" isRequired>
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Cardnumber:
          </FormLabel>
          <Input
            placeholder="Enter Cardnumber"
            size="lg"
            {...formik.getFieldProps('cardnumber')}
          />
        </FormControl>
        <FormControl id="cvv" isRequired>
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            CVV:
          </FormLabel>
          <Input
            placeholder="Enter CVV"
            size="lg"
            {...formik.getFieldProps('cvv')}
          />
        </FormControl>
        {/* <FormControl id="totalamount" isRequired>
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Total Amount(￡):
          </FormLabel>
          <NumberInput
            min={0}
            precision={2}
            placeholder="Enter Price"
            size="lg"
            isDisabled={true}
            defaultValue={formik.getFieldProps('totalamount').value}
          >
            <NumberInputField {...formik.getFieldProps('totalamount')} />
          </NumberInput>
        </FormControl> */}

        <GridItem colStart={2} justifySelf="end">
          <Button size="lg" onClick={handleClose} mr="20px">
            Cancel
          </Button>
          <Button size="lg" colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </GridItem>
      </Grid>
    </Wrap>
  );
}
