import React from 'react';
import { Link, Icon, Box } from '@chakra-ui/react';
import { AiOutlineRight } from 'react-icons/ai';
import { NavLink as RouterLink } from 'react-router-dom';

export default function UserNavBar() {
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
        Sell book <Icon as={AiOutlineRight}></Icon>
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
