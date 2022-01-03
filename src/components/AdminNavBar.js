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
import { AiOutlineShopping, AiOutlineRight } from 'react-icons/ai';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import UserContex from '../context/UserContex';
import CartContext from '../context/CartContext';

export default function AdminNavBar() {

  return (
    <Box w="260px" m="0 auto">
      <Link
        as={RouterLink}
        to="/allbooks"
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
        Books <Icon as={AiOutlineRight}></Icon>
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
        to="/allusers"
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
        Users <Icon as={AiOutlineRight}></Icon>
      </Link>
      <Link
        as={RouterLink}
        to="/allorders"
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
        Orders <Icon as={AiOutlineRight}></Icon>
      </Link>
    </Box>
  );
}
