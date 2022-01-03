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
  SimpleGrid,
  Divider,
  Textarea,
  Button,
} from '@chakra-ui/react';
import UserContext from '../context/UserContex';
import {
  createMessage,
  findOrCreateConversation,
  findAllCoversations,
} from '../api/api';
import { useHistory, useParams } from 'react-router';
import { useMutation, useQuery } from 'react-query';
import { socket } from '../web-sockets';

export default function ContactSideBar() {
  const { user } = UserContext.useContainer();
  const { data: conversations } = useQuery(['conversations'], () =>
    findAllCoversations({
      user: user.id,
    })
  );
  console.log(conversations);
  
  return (
    <Box w="500px" h="100vh" padding="50px 80px 0">
      {conversations.map(conversation => (
        <Flex key={conversation.id} h="80px" alignItems="center">
          <Image h="80px" w="50px" src={conversation.book.cover} />
          <Text>{conversation.book.bookname}</Text>
        </Flex>
      ))}
    </Box>
  );
}
