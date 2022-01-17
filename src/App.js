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
import UserContex from './context/UserContex';
import CartContext from './context/CartContext';
import routes from './Router';
import { renderRoutes } from 'react-router-config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
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
              {/* <AuthVerify /> */}
              {renderRoutes(routes)}
            </Router>
          </CartContext.Provider>
        </UserContex.Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
