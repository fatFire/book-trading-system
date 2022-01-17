import React, { useState } from 'react';
import {
  Flex,
  Avatar,
  IconButton,
  Text,
  Link,
  Icon,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import {
  AiOutlineShopping,
  AiOutlineRight,
  AiOutlineMail,
} from 'react-icons/ai';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import UserContex from '../../context/UserContex';
import CartContext from '../../context/CartContext';

export default function NavBar() {
  const { user, logout: userLogout } = UserContex.useContainer();
  const { logout } = CartContext.useContainer();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    userLogout();
  };

  return (
    <div>
      <Flex h={200} align="center" mx="10">
        {user?.username ? (
          <Avatar mr="20px" colorScheme="facebook" name={user?.username} />
        ) : null}
        <Popover trigger="hover">
          <PopoverTrigger>
            {user.username ? (
              <Text
                fontSize="1.5rem"
                fontWeight="semibold"
                color="blue.800"
                isTruncated
                cursor="pointer"
              >
                {`${user.username}`}
              </Text>
            ) : (
              <Link
                as={RouterLink}
                to="/signup"
                fontSize="1.5rem"
                fontWeight="semibold"
                color="blue.800"
              >
                Welcome, Sign up/in
              </Link>
            )}
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <Button onClick={handleLogout} isDisabled={!user.username}>
                Log out
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Flex justify="flex-end" sx={{ flex: 1 }}>
          <IconButton
            mt="10px"
            mr="5px"
            aria-label="cart"
            bgColor="#f5f4f7"
            icon={<AiOutlineShopping color="#2A4365" fontSize={25} />}
            onClick={() => {
              history.push('/cart');
            }}
          />
          <IconButton
            mt="10px"
            aria-label="mail"
            bgColor="#f5f4f7"
            icon={<AiOutlineMail color="#2A4365" fontSize={25} />}
            onClick={() => {
              history.push('/contact');
            }}
          />
        </Flex>
      </Flex>
    </div>
  );
}

function UserNavBar() {
  return (
    <Box w="260px" m="0 auto">
      <Link
        as={RouterLink}
        to="/explore"
        exact
        fontSize="20px"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        mb="30px"
        fontWeight="semibold"
        color="gray.400"
        activeStyle={{
          color: '#2A4365',
        }}
      >
        Expolre <Icon as={AiOutlineRight}></Icon>
      </Link>
      {/* <Link
          as={RouterLink}
          to="/categories"
          fontSize="20px"
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          mb="30px"
          fontWeight="semibold"
          color="gray.400"
          activeStyle={{
            color: '#2A4365',
          }}
        >
          Categories <Icon as={AiOutlineRight}></Icon>
        </Link> */}
      <Link
        as={RouterLink}
        to="/sellbook"
        fontSize="20px"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        mb="30px"
        fontWeight="semibold"
        color="gray.400"
        activeStyle={{
          color: '#2A4365',
        }}
      >
        Sell a book <Icon as={AiOutlineRight}></Icon>
      </Link>
      <Link
        as={RouterLink}
        to="/mybooks"
        fontSize="20px"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        mb="30px"
        fontWeight="semibold"
        color="gray.400"
        activeStyle={{
          color: '#2A4365',
        }}
      >
        My Books <Icon as={AiOutlineRight}></Icon>
      </Link>
      <Link
        as={RouterLink}
        to="/myorders"
        fontSize="20px"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        mb="30px"
        fontWeight="semibold"
        color="gray.400"
        activeStyle={{
          color: '#2A4365',
        }}
      >
        My Orders <Icon as={AiOutlineRight}></Icon>
      </Link>
    </Box>
  );
}
