import React from 'react';
import { Box } from '@chakra-ui/react';
import NavBar from './NavBar';


import { Switch, Route } from 'react-router-dom';
import Explore from './Explore'
import Signup from './Signup';
import Signin from './Signin';
import SellBook from './SellBook';
import YourBooks from './YourBooks';
import Details from './details';
import Cart from './Cart';
import Payment from './Payment';
import AllBooks from './AllBooks';
import AddBook from './AddBook';
import ModifyBook from './ModifyBook';
import AllOrders from './AllOrders';
import ModifyOrder from './ModifyOrder';
import AllUsers from './AllUsers';
import ModifyUser from './ModifyUser';
import AddUser from './AddUser';
import PaySuccess from './PaySuccess';
import MyOrders from './MyOrders';
import Loading from './Loading';
import Contact from './Contact';
import { renderRoutes } from 'react-router-config';

export default function Home({route}) {
  return (
    <Box h={'100vh'} display="flex">
      <Box minW={500} height="full" px={10} bgColor="#f5f4f7">
        <NavBar />
      </Box>
      <Box height="full" sx={{ flex: '1' }}>
        {renderRoutes(route.routes)}
      </Box>
    </Box>
  );
}
