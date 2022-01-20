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
  Tabs, TabList, TabPanels, Tab, TabPanel,
  FormControl,
  FormLabel,
  FormErrorMessage,

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
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';

export default function UserSignin() {
  const [show, setShow] = useState(false);
  const userContext = UserContext.useContainer();
  const cartContext = CartContext.useContainer();
  const history = useHistory();
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
      userContext.login(data.user);
      cartContext.setCart(data.cart);
      history.replace('/');
    },
    onError: error => {
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



  return (

      <Box w="50%" m="150px auto 0">
        <Formik
          initialValues={{
            identifier: '',
            password: ''
          }}
          validationSchema={Yup.object().shape({
            identifier: Yup.string().required('Required'),
            password: Yup.string()
              .min(6, 'Must be 6 characters or more')
              .required('Required'),
          })}
          onSubmit={async (values) => {
            await mutation.mutate(values);
          }}
        >
          {props => (
            <Form>
              <Field name="identifier">
                {({ field, form }) => (
                  <FormControl
                    id="identifier"
                    isRequired
                    mb="30px"
                    isInvalid={form.errors.identifier && form.touched.identifier}
                  >
                    <FormLabel fontWeight={600} fontSize="lg" mb={2}>
                      Identifier:
                    </FormLabel>
                    <Input placeholder="Enter Username or email" size="lg" {...field} />
                    <FormErrorMessage>{`* ${form.errors.identifier}`}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    id="password"
                    isRequired
                    mb="30px"
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel fontWeight={600} fontSize="lg" mb={2}>
                      Password:
                    </FormLabel>
                    <InputGroup size="lg">
                      <Input
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Enter password"
                        {...field}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{`* ${form.errors.password}`}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Flex alignItems="center" justifyContent="space-between">
                <Link
                  as={RouterLink}
                  to="/signup"
                  fontSize="18px"
                  color="gray.400"
                  activeStyle={{
                    color: '#2A4365',
                  }}
                >
                  No account yet? Sign up!
                </Link>
                <Button
                  colorScheme="blue"
                  isLoading={mutation.isLoading}
                  type="submit"
                >
                  Submit
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
  );
}
