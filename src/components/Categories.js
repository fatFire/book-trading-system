import React, { useState } from 'react';
import {
  Flex,
  Avatar,
  IconButton,
  Text,
  Link,
  Icon,
  Box,
  Heading,
  Image,
  Select,
  SimpleGrid 
} from '@chakra-ui/react';
import { useQuery } from "react-query";
import axios from 'axios';
import { useHistory } from 'react-router-dom'

export default function Categories() {
  const [category, setcategory] = useState("All")
  const { isLoading, data } = useQuery("books", () => axios.get('http://localhost:1337/books'))

  let books = data?.data || []
  if(category !== "All") {
    console.log(category, category === "All")
    books = books.filter(book => book.category?.name === category)
  } 

  function handleCategoryChange(event) {
    setcategory(event.target.value)
  }

  return (
    
    <Box h="100vh" overflow="auto" px="20">
      <Flex h="200px" align="center">
        <Heading color="blue.800">Explore</Heading>
      </Flex>
      <Select
        w="400px"
        variant="unstyled"
        fontSize="30px"
        fontWeight="700"
        color="blue.800"
        colorScheme="telegram"
        defaultValue="All"
        onChange={handleCategoryChange}
        mb="30px"
      >
        <option value="All">All</option>
        <option value="Art">Art</option>
        <option value="Biography">Biography</option>
        <option value="Business">Business</option>
        <option value="Children's">Children's</option>
        <option value="Classics">Classics</option>
        <option value="Comics">Comics</option>
        <option value="Computers & Technology">Computers & Technology</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Fiction">Fiction</option>
        <option value="History">History</option>
        <option value="Horror">Horror</option>
        <option value="Music">Music</option>
        <option value="Mystery">Mystery</option>
        <option value="Poetry">Poetry</option>
        <option value="Psychology">Psychology</option>
        <option value="Sports">Sports</option>
        <option value="Thriller">Thriller</option>
        <option value="Travel">Travel</option>
      </Select>
      <SimpleGrid 
        minChildWidth="220px"
        spacing="30px"
      >
        {books.map(book => (<BookCover key={book._id} {...book} baseURL='http://localhost:1337' />))}
      </SimpleGrid>
    </Box>
  );
}

const BookCover = function (props) {
  
  const history = useHistory()

  function handleClick() {
    history.push(`/books/${props.id}`)
  }
  
  return (
    <Box cursor="pointer" onClick={handleClick}>
      <Flex w="200px" h="250px" bgColor="gray.200" borderRadius="20px" justify="center" align="center">
        <Image src={props.baseURL + props.imgs?.[0]?.url} border="none" height="200px" width="150px" fit="fill" />
      </Flex>
      <Text fontSize="xl" fontWeight="600" color="grey.200" isTruncated align="center" mt="10px" w="200px">
        {props.bookname}
      </Text>
    </Box>
  );
};
