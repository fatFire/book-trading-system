import React, { useState } from 'react';
import { Flex, Text, Box, Heading, Image } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Search from './Search';

export default function Explore() {
  const [category] = useState('All');
  const { data } = useQuery('books', () =>
    axios.get('http://localhost:1337/books?status=available&isDeleted=false')
  );
  
  let books = data?.data || [];
  if (category !== 'All') {
    books = books.filter(book => book.category?.name === category);
  }

  return (
    <Box h="100vh" overflow="auto" px="20">
      <Flex h="200px" alignItems="center">
        <Heading color="blue.800" mr="200px">
          All Books
        </Heading>
        <Search />
      </Flex>
      <Flex flexWrap="wrap">
        {books.length === 0 ? (
          <Flex
            w="100%"
            justifyContent="center"
            fontSize="24px"
            fontWeight="600"
          >
            No Book
          </Flex>
        ) : (
          books.map(book => (
            <BookCover
              key={book._id}
              {...book}
              baseURL="http://localhost:1337"
            />
          ))
        )}
      </Flex>
    </Box>
  );
}

const BookCover = function (props) {
  const history = useHistory();

  function handleClick() {
    history.push(`/books/${props.id}`);
  }

  return (
    <Box mr="45px" mb="50px" cursor="pointer" onClick={handleClick}>
      <Flex
        w="200px"
        h="250px"
        bgColor="gray.200"
        borderRadius="20px"
        justify="center"
        align="center"
      >
        {/* <Image src={props.baseURL + props.imgs?.[0]?.url} border="none" height="200px" width="150px" fit="fill" /> */}
        <Image
          src={props.cover}
          border="none"
          height="200px"
          width="150px"
          fit="fill"
        />
      </Flex>
      <Text
        fontSize="xl"
        fontWeight="600"
        color="grey.200"
        isTruncated
        align="center"
        mt="10px"
        w="200px"
      >
        {props.bookname}
      </Text>
    </Box>
  );
};
