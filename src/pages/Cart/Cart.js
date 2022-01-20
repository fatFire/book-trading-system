import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Image, Text, Button, Flex, } from '@chakra-ui/react';
import { useQueryClient, useMutation } from 'react-query';
import { useHistory, Redirect } from 'react-router';
import CartContex from '../../context/CartContext';
import UserContext from '../../context/UserContex'
import { deleteBookFromCart } from './api';

export default function Cart() {

  const token = window.localStorage.getItem('jwt');
  const { user } = UserContext.useContainer()
  const { cart, setCart } = CartContex.useContainer();
  const history = useHistory();

  let totalamount = 0;
  cart.books?.forEach(book => {
    totalamount += book.price;
  });

  const deleteBook = function (id) {
    const books = cart.books.filter(book => book.id !== id);
    const data = {
      books,
    };
    return deleteBookFromCart(cart.id, data, { token });
  };

  const mutation = useMutation(deleteBook, {
    onSuccess: data => {
      setCart(data);
    },
  });

  const handleDelete = function (id) {
    mutation.mutate(id);
  };

  const handleBuyNow = function () {
    history.push('/payment', {
      books: cart.books,
      totalamount,
    });
  };


  if(!user.id) {
    return <Redirect to="/signin" />
  }

  return (
    <Box>
      <Heading w="500px" m="50px auto" textAlign="center">
        Shopping Cart
      </Heading>
      <Box w="90%" m="0 auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Item</Th>
              <Th>Details</Th>
              <Th>Cost(￡)</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.books.map(book => (
              <Tr key={book.id}>
                <Td>
                  <Image
                    src={book.cover}
                    border="none"
                    height="150px"
                    width="100px"
                    fit="fill"
                  />
                </Td>
                <Td>
                  <Flex flexDirection="column" justifyContent="space-around">
                    <Box fontSize="lg" fontWeight="600" mb="10px">
                      Author name: {book.author}
                    </Box>
                    <Box fontSize="lg" fontWeight="600" mb="10px">
                      Category: {book.category?.name || 'Fiction'}
                    </Box>
                    <Box fontSize="lg" fontWeight="600" mb="10px">
                      Book Condition: {book.condition}
                    </Box>
                    <Box fontSize="lg" fontWeight="600" mb="10px">
                      Description: {book.description}
                    </Box>
                  </Flex>
                </Td>
                <Td>{book.price}</Td>
                <Td>
                  <Button
                    onClick={handleDelete.bind(null, book.id)}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex direction="column" alignItems="flex-end" mt="50px">
          <Text fontSize="lg" fontWeight="semibold" mb={5}>
            Total Amount: {totalamount} ￡
          </Text>
          <Button onClick={handleBuyNow} colorScheme="blue">
            Buy Now
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
