import React, { useState, useEffect, useRef } from 'react';
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
import UserContext from '../../context/UserContex';
import { useHistory, useParams } from 'react-router';
import { useMutation, useQuery } from 'react-query';
import { socket } from '../../web-sockets';
import ClosePage from '../../component/ClosePage';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { findAllCoversations } from './api';

export default function Contact() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversation, setConsersation] = useState(undefined);
  const { user } = UserContext.useContainer();
  const history = useHistory();
  // const { id: conversationID } = useParams();
  // console.log('conversationID:', conversation);

  const { data: conversations } = useQuery(['conversations'], () =>
    findAllCoversations({
      user: user.id,
    })
  );
  console.log(conversations);

  const handleSend = function () {
    const to = conversation.users.find(_ => _.id !== user.id);
    console.log(input, user.id, to);
    const message = {
      message: input,
      fromto: [user.id, to.id],
      conversation: conversation.id,
    };
    setInput('');
    // setMessages(prev => {
    //   return [...prev, message];
    // });
    // messageMutation.mutate(message);
    socket.emit('send_message', message);
  };

  function handleEnter(e) {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  const handleInputChange = function (e) {
    e.preventDefault();
    setInput(e.target.value);
  };

  useEffect(() => {
    socket.on('send_message', res => {
      console.log(res);
      setMessages(prev => {
        return [...prev, res];
      });
    });
  }, []);
  console.log(messages);

  // socket.on('send_message', res => {
  //   console.log(res);
  //   setMessages(prev => {
  //     return [...prev, res];
  //   });
  // });

  return (
    <Flex h="100vh">
      <SideBar
        conversations={conversations || []}
        setMessages={setMessages}
        setConsersation={setConsersation}
      />
      {conversation ? (
        <Box padding="10px" flex={1}>
          <Content messages={messages} user={user} />
          <Textarea
            mb="10px"
            resize="none"
            value={input}
            onChange={handleInputChange}
            onKeyUp={handleEnter}
          />
          <Flex justifyContent="flex-end">
            <Button onClick={handleSend}>Send</Button>
          </Flex>
        </Box>
      ) : null}
    </Flex>
  );
}

function Content({ messages, user }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box height="80%" overflow="auto">
      {messages.map((message, index) => (
        <Message
          key={index}
          isLeft={
            message.fromto[0]?.id
              ? message.fromto[0].id !== user.id
              : message.fromto[0] !== user.id
          }
          message={message.message}
        />
      ))}
      <div ref={messagesEndRef}></div>
    </Box>
  );
}

function Message({ isLeft, message }) {
  return (
    <Flex justifyContent={isLeft ? 'flex-start' : 'flex-end'} m="5px">
      <Text
        borderRadius="5px"
        maxWidth="500px"
        padding="5px 10px"
        fontSize="18px"
        backgroundColor={isLeft ? '#E2E8F0' : '#63B3ED'}
      >
        {message}
      </Text>
    </Flex>
  );
}

function SideBar({ conversations, setMessages, setConsersation }) {
  // const { user } = UserContext.useContainer();
  // const { data: conversations } = useQuery(['conversations'], () =>
  //   findAllCoversations({
  //     user: user.id,
  //   })
  // );
  // console.log(conversations);
  // const history = useHistory();
  const handleClick = ({ messages, conversation }) => {
    setMessages(messages);
    setConsersation(conversation);
  };

  const history = useHistory();

  const handleClose = () => {
    history.push('/');
  };

  return (
    <Box
      w="40%"
      maxWidth="500px"
      padding="50px 30px 0 30px"
      position="relative"
      borderRight="1px solid #e2e8f0"
    >
      <Text fontSize="24px" fontWeight="600" mb="10px">
        Conversations:{' '}
      </Text>
      {conversations.length === 0
        ? 'No Conversation'
        : conversations.map(conversation => (
            <Flex
              key={conversation.id}
              h="80px"
              mb="20px"
              cursor="pointer"
              onClick={handleClick.bind(undefined, {
                messages: conversation.messages,
                conversation: conversation,
              })}
            >
              <Image
                h="80px"
                w="50px"
                src={conversation.book.cover}
                mr="10px"
              />
              <Flex wrap="wrap" direction="column" flex={1}>
                <Text mt="10px" fontSize="lg" isTruncated fontWeight="600">
                  {conversation.book.bookname}
                </Text>
                <Text color="#718096" mt="10px" isTruncated>
                  {conversation?.messages[conversation.messages.length - 1]
                    ?.message || ''}
                </Text>
              </Flex>
            </Flex>
          ))}
    </Box>
  );
}
