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
  Heading
} from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';
import { AiOutlineUser, AiOutlineKey, AiOutlineMail } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { Wrap } from './Wrap';
import User from '../context/UserContex';
import CartContext from '../context/CartContext';
import ClosePage from './ClosePage';
import axios from 'axios';

export default function AddUser() {
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    email: '',
  });
  const context = User.useContainer();
  const cartContext = CartContext.useContainer();

  const history = useHistory();
  const standaloneToast = createStandaloneToast();

  async function mutationFn(data) {
    try {
      const user = await axios.post(
        'http://localhost:1337/auth/local/register',
        data
      );
      console.log(user.data);
      const cart = await axios.post(
        'http://localhost:1337/carts',
        {
          users_permissions_user: user.data.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.data.jwt}`,
          },
        }
      );
      console.log(cart);
      return { user: user.data, cart: cart.data };
    } catch (e) {
      throw e;
    }
  }

  const mutation = useMutation(mutationFn, {
    mutationKey: 'cart',
    onSuccess: data => {
      standaloneToast({
        title: 'Success',
        description: 'Successfully Sign Up',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      // context.login(data.user);
      // console.log(data.cart);
      // cartContext.setCart(data.cart);
      history.replace('/');
    },
    onError: error => {
      console.log(error);
      standaloneToast({
        title: 'Error',
        description:
          error.response?.data.message[0].messages[0].message ||
          'Sign up Error',
        status: 'error',
        position: 'top',
        isClosable: true,
      });
      mutation.reset();
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

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <Wrap pt="200px">
      <ClosePage />
      <Heading fontSize="26px" w="500px" m="0 auto 30px" textAlign="center">
        Add a User
      </Heading>
      <Box w="500px" m="0 auto">
        <InputGroup size="lg" mb="30px">
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineUser color="#CBD5E0" />}
          />
          <Input
            type="text"
            placeholder="Enter user name"
            value={userInfo.username}
            name="username"
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
        <InputGroup size="lg" mb="30px">
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineMail color="#CBD5E0" />}
          />
          <Input
            placeholder="Enter email"
            value={userInfo.email}
            name="email"
            onChange={handleInputChange}
          />
        </InputGroup>
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem justifySelf="end"></GridItem>
          <GridItem justifySelf="end">
            <Button size="md" onClick={handleCancel} mr="30px">
              Cancel
            </Button>
            <Button
              size="md"
              bgColor="blue.500"
              isLoading={mutation.isLoading}
              onClick={handleSubmit}
            >
              Add a User
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </Wrap>
  );
}
