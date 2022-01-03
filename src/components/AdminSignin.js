import React, { useState } from 'react';
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
  Button,
  Grid,
  GridItem,
  chakra,
  useToast,
  createStandaloneToast,
  Link,
  Checkbox,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';
import { AiOutlineUser, AiOutlineKey, AiOutlineMail } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { Redirect, useHistory } from 'react-router';
import { Wrap } from './Wrap';
import UserContext from '../context/UserContex';
import CartContext from '../context/CartContext';
import ClosePage from './ClosePage';
import axios from 'axios';
import { adminLogin } from '../api/api';

export default function AdminSignin() {
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const userContext = UserContext.useContainer();
  const cartContext = CartContext.useContainer();
  const history = useHistory();
  const toast = useToast();
  const standaloneToast = createStandaloneToast();

  const adminMutationFn = async adminInfo => {
    const data = {
      email: adminInfo.email,
      password: adminInfo.password,
    };
    try {
      const user = await adminLogin(data);
      console.log(user.data)
      return user.data.data;
    } catch (e) {
      throw e;
    }
  };

  const adminMutation = useMutation(adminMutationFn, {
    onSuccess: data => {
      standaloneToast({
        title: 'Success',
        description: 'Successfully Sign in',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      console.log(data);
      data.user.isAdmin = true
      const user = {
        jwt: data.token,
        user: data.user,
      }
      userContext.login(user);
      history.replace('/');
    },
  });

  const handleShowClick = () => setShow(!show);
  const handleInputChange = event => {
    setUserInfo(prevState => {
      return { ...prevState, ...{ [event.target.name]: event.target.value } };
    });
  };
  const handleSubmit = () => {
    adminMutation.mutate(userInfo);
  };
  const showToast = () => {
    toast({
      title: 'Error',
      description:
        adminMutation.error.response?.data.message[0].messages[0].message ||
        'Sign up Error',
      status: 'error',
      position: 'top',
      isClosable: true,
    });
    adminMutation.reset();
  };

  return (
    <div>
      <Box w="500px" m="0 auto">
        <InputGroup size="lg" mb="30px">
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineUser color="#CBD5E0" />}
          />
          <Input
            type="text"
            placeholder="Enter email"
            value={userInfo.email}
            name="email"
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup size="lg" mb="30px">
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineKey color="#CBD5E0" />}
          />
          <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
            value={userInfo.password}
            name="password"
            onChange={handleInputChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>
            
          </GridItem>
          <GridItem justifySelf="end">
            <Button
              size="md"
              bgColor="blue.500"
              isLoading={adminMutation.isLoading}
              onClick={handleSubmit}
            >
              Sing in
            </Button>
          </GridItem>
        </Grid>
      </Box>
      {adminMutation.isError ? showToast() : null}
    </div>
  );
}

const userSignUp = function () {};
