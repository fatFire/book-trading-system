import React from 'react';
import {
  Box,
  Heading,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Image,
  TableCaption,
  Grid,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import axios from 'axios';
import Loading from './Loading';
import User from '../context/UserContex';
import CartContex from '../context/CartContext';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function Cart() {
  const cartContext = CartContex.useContainer();
  const history = useHistory();
  const baseURL = 'http://localhost:1337';
  const bookIds = new Set(cartContext.cart.books?.map(book => book.id));
  const queryClient = useQueryClient();
  const books = queryClient
    .getQueryData('books')
    .data.filter(book => bookIds.has(book.id));
  console.log(cartContext.cart);
  const token = JSON.parse(window.localStorage.getItem('jwt'));
  let totalamount = 0
  books.forEach(book => {
    totalamount += book.price
  })

  // const { isLoading, data: books } = useQuery(['books'], () =>
  //   axios.get(`http://localhost:1337/books`)
  // );

  const handleClose = () => {
    history.push('/');
  };

  const deleteBook = function (ids) {
    const set = new Set(ids)
    const books = cartContext.cart.books.filter(bookId => !set.has(bookId));
    const data = {
      books,
    };
    return axios.put(
      `http://localhost:1337/carts/${cartContext.cart.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const mutation = useMutation(deleteBook, {
    onSuccess: data => {
      cartContext.setCart(data.data);
    },
  });

  const handleDelete = function(id) {
    mutation.mutate([id]);
  };

  const clearCartBooks = function() {
    mutation.mutate(books)
  }

  const handleBuyNow = function() {
    history.push('/payment', {
      books,
      totalamount
    })
  }

  console.log(books);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <Box>
      <IconButton
        position="fixed"
        right="10px"
        top="10px"
        colorScheme="blue"
        aria-label="close"
        icon={<AiOutlineCloseCircle fontSize="26px" />}
        onClick={handleClose}
      />
      <Heading w="500px" m="50px auto" textAlign="center">
        Shopping Cart
      </Heading>
      <Box w="1200px" m="0 auto">
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
            {books.map(book => (
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
                      Category: {book.category?.name || "Fiction"}
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
                  <Button onClick={handleDelete.bind(null, book.id)} colorScheme="red">
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
          <Button onClick={handleBuyNow} colorScheme="blue">Buy Now</Button>
        </Flex>
      </Box>
    </Box>
  );
}
