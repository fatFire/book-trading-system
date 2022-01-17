import React, { useState } from 'react';
import { Flex, Text, Box, Heading, Image } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Search from './Search';
import { getAllBooks } from './api';
import BookCover from './BookCover';
import Loading from '../../component/Loading';
import Error from '../../component/Error';
import * as qs from 'qs';
import { categoriesMap } from '../../common/CategoriesMap';

export default function Explore() {
  const [filters, setFilters] = useState({
    min: '',
    max: '',
    bookname: '',
    condition: '',
    category: ''
  });

  const convert2Undefined = value => {
    if (value === '') {
      return undefined;
    }
    return value;
  };

  const { data:books, isLoading, isSuccess, refetch } = useQuery('allbooks', () => {
    const name = convert2Undefined(filters.bookname);
    const condition = convert2Undefined(filters.condition);
    const min = convert2Undefined(filters.min)
    const max = convert2Undefined(filters.max)
    const category = convert2Undefined(categoriesMap[filters.category]);
    const query = qs.stringify(
      {
        _where: {
          price_gte: min,
          price_lte: max,
          condition: condition,
          category: category,
          _or: [
            { bookname_contains: name },
            { author_contains: name },
            { isbn_contains: name },
          ],
        },
      },
      { encode: false }
    );
    return getAllBooks(query)
  });


  if(isLoading) {
    return <Loading />
  }

  if(!isSuccess) {
    return <Error />
  }

  return (
    <Box h="100vh" overflow="auto" px="20" >
      <Flex h="200px" alignItems="center">
        <Heading color="blue.800" mr="200px">
          All Books
        </Heading>
        <Search filters={filters} setFilters={setFilters} refetch={refetch} />
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
            />
          ))
        )}
      </Flex>
    </Box>
  );
}
