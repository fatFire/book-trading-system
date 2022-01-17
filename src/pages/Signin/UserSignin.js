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
  Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';
import { AiOutlineUser, AiOutlineKey, AiOutlineMail } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { Redirect, useHistory } from 'react-router';
import { Wrap } from '../../component/Wrap';
import UserContext from '../../context/UserContex';
import CartContext from '../../context/CartContext';
import ClosePage from '../../component/ClosePage';
import axios from 'axios';
import { adminLogin } from '../../api/api';
import { socket } from '../../web-sockets';
import { signin, getCart } from './api';

export default function UserSignin() {
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({
    identifier: '',
    password: '',
  });
  const userContext = UserContext.useContainer();
  const cartContext = CartContext.useContainer();
  const history = useHistory();
  const toast = useToast();
  const standaloneToast = createStandaloneToast();


  const mutationFn = async data => {
    try {
      const user = await signin(data)
      const cart = await getCart(user.user.id, {
        token: user.jwt
      });
      return { user: user, cart: cart[0] };
    } catch (e) {
      throw e;
    }
  };

  const mutation = useMutation(mutationFn, {
    onSuccess: data => {
      standaloneToast({
        title: 'Success',
        description: 'Successfully Sign in',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      console.log(data);
      userContext.login(data.user);
      cartContext.setCart(data.cart);
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
    mutation.mutate(userInfo);
  };
  const showToast = () => {
    toast({
      title: 'Error',
      description:
        mutation.error.response?.data.message[0].messages[0].message ||
        'Sign up Error',
      status: 'error',
      position: 'top',
      isClosable: true,
    });
    mutation.reset();
  };

  return (
    <Box>
      <Box w="500px" m="250px auto">
        <InputGroup size="lg" mb="30px">
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineUser color="#CBD5E0" />}
          />
          <Input
            type="text"
            placeholder="Enter username or email"
            value={userInfo.identifier}
            name="identifier"
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
            <Link
              as={RouterLink}
              to="/signup"
              fontSize="16px"
              color="gray.400"
              activeStyle={{
                color: '#2A4365',
              }}
            >
              Doesn't have an account? Sign up!
            </Link>
          </GridItem>
          <GridItem justifySelf="end">
            <Button
              size="md"
              bgColor="blue.500"
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
            >
              Sing in
            </Button>
          </GridItem>
        </Grid>
      </Box>
      {mutation.isError ? showToast() : null}
    </Box>
  );
}
