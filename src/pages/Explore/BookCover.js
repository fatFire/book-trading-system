import { useHistory } from 'react-router-dom';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';


export default function BookCover (props) {
  const history = useHistory();

  function handleClick() {
    history.push(`/books/${props.id}`);
  }

  return (
    <Box mb="50px" cursor="pointer" onClick={handleClick}>
      <Flex
        w="200px"
        h="250px"
        bgColor="gray.200"
        borderRadius="20px"
        justify="center"
        align="center"
      >
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
