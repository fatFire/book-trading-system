import React from 'react';
import { Flex, Avatar, IconButton, Text, Link, Icon, Box, Popover, PopoverTrigger, PopoverContent, PopoverBody, Button, PopoverArrow, } from '@chakra-ui/react';
import { AiOutlineShopping, AiOutlineMail, } from 'react-icons/ai';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import UserContex from '../../context/UserContex';
import CartContext from '../../context/CartContext';
import UserNavBar from './UserNavBar'

export default function SideBar() {
  const { user, logout: userLogout } = UserContex.useContainer();
  const { logout } = CartContext.useContainer();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    userLogout();
  };

  return (
    <Box>
      <Flex justifyContent="center" alignItems="center" mt="80px">
        {user?.id ? (
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
                to="/signin"
                fontSize="1.5rem"
                fontWeight="semibold"
                color="blue.800"
              >
                Welcome, Sign up/in
              </Link>
            )}
          </PopoverTrigger>
          <PopoverContent w="200px">
            <PopoverArrow />
            <PopoverBody>
              <Button w="100%" onClick={handleLogout} isDisabled={!user.id}>
                Log out
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <Flex justifyContent="center" alignItems="center" mb="50px">
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
        <UserNavBar />
    </Box>
  );
}
