import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import theme from './theme';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import SellBook from './components/SellBook';
import UserContex from './context/UserContex';
import YourBooks from './components/YourBooks';
import Details from './components/details';
import Cart from './components/Cart';
import Payment from './components/Payment';
import CartContext from './context/CartContext';
import AuthVerify from './common/AuthVerify';
import AllBooks from './components/AllBooks';
import AddBook from './components/AddBook';
import ModifyBook from './components/ModifyBook';
import AllOrders from './components/AllOrders';
import ModifyOrder from './components/ModifyOrder';
import AllUsers from './components/AllUsers';
import ModifyUser from './components/ModifyUser';
import AddUser from './components/AddUser';
import PaySuccess from './components/PaySuccess';
import MyOrders from './components/MyOrders';
import Loading from './components/Loading';
import Search from './components/Search';
import Contact from './components/Contact';
import { socket } from './web-sockets';
import ContactSideBar from './components/ContactSideBar';
import routes from './Router';
import { renderRoutes } from 'react-router-config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <UserContex.Provider>
          <CartContext.Provider>
            <Router>
              <AuthVerify />
              {renderRoutes(routes)}
            </Router>
          </CartContext.Provider>
        </UserContex.Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
