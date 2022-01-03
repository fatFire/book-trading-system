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
import { useMutation } from 'react-query';
import axios from 'axios';
import { Wrap } from './Wrap';
import { Redirect } from 'react-router';
import User from '../context/UserContex';
import { updateUser } from '../api/api';

export default function ModifyUser() {
  const toast = createStandaloneToast();
  const history = useHistory();
  const user = User.useContainer();
  const muser = history.location.state.user
  console.log(muser)
  console.log(user)
  const token = JSON.parse(window.localStorage.getItem('jwt'))
  
  const formik = useFormik({
    
    initialValues: {
      email: muser.email,
      username: muser.username,
      password: muser.password,
    },
    onSubmit: null,
  });

  const mutationFn = () => {
    console.log(formik.values, muser.id)
    return updateUser(muser.id, formik.values) 
  };

  const mutation = useMutation(mutationFn, {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Successfully modified a book',
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
        Modify a User
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" w="50%" m="0 auto" gap={10}>
        <FormControl id="email">
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Email:
          </FormLabel>
          <Input
            placeholder="Enter Email"
            size="lg"
            {...formik.getFieldProps('email')}
          />
        </FormControl>
        <FormControl id="username">
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Username:
          </FormLabel>
          <Input
            placeholder="Enter Username"
            size="lg"
            {...formik.getFieldProps('username')}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Password:
          </FormLabel>
          <Input
            placeholder="Enter Password"
            size="lg"
            {...formik.getFieldProps('password')}
          />
        </FormControl>
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
