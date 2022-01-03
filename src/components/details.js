import React, { useContext, useState } from 'react';
import {
  Flex,
  Button,
  Avatar,
  IconButton,
  Text,
  Link,
  Icon,
  Box,
  Heading,
  Image,
  Divider,
  Textarea,
} from '@chakra-ui/react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useHistory, useParams } from 'react-router';
import { useMutation } from 'react-query';
import { useQueryClient, useQuery } from 'react-query';
import UserContext from '../context/UserContex';
import CartContext from '../context/CartContext';
import axios from 'axios';
import Loading from './Loading';
import { Redirect } from 'react-router';
import { createComment, findAllComments, findOrCreateConversation } from '../api/api';

export default function Details() {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const cartContext = CartContext.useContainer();
  const userContext = UserContext.useContainer();
  const baseURL = 'http://localhost:1337';
  const token = JSON.parse(window.localStorage.getItem('jwt'));
  console.log(cartContext);

  const isInCart =
    cartContext.cart.books?.some(book => book.id === id) || false;

  const book = queryClient
    .getQueryData('books')
    .data.find(item => item.id === id);
  console.log(book);

  const { data: comments } = useQuery('comments', () => {
    return findAllComments(book.id)
  }, {
    enabled: !!book
  })

  console.log(comments)

  const isMyBook = book['users_permissions_user']?.id === userContext.user.id;

  const handleClose = () => {
    history.push('/');
  };

  const addToCart = function (id) {
    const books = cartContext.cart.books?.map(book => book.id);
    books.push(id);
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

  const mutation = useMutation(addToCart, {
    onSuccess: data => {
      console.log(data.data);
      cartContext.setCart(data.data);
    },
  });

  const createConversation = useMutation(findOrCreateConversation, {
    onSuccess: data => {
      console.log(data);
      history.push(`/contact/${data.data.id}`, {
        conversation: data.data,
      });
    },
  });

  const handleAddToCart = function () {
    if (!token) {
      history.push('/signin');
    } else {
      mutation.mutate(id);
    }
  };

  const handleBuyNow = () => {
    if (!token) {
      history.push('/signin');
    } else {
      history.push('/payment', {
        books: [book],
        totalamount: book.price,
      });
    }
  };

  const handleContactSeller = () => {
    if (!token) {
      history.push('/signin');
    } else {
      console.log({
        book: book.id,
        user1: userContext.user.id,
        user2: book['users_permissions_user'].id,
      });
      createConversation.mutate({
        book: book.id,
        users: [userContext.user.id, book['users_permissions_user'].id],
      });
    }
  };

  return (
    <div>
      <IconButton
        position="fixed"
        right="10px"
        top="10px"
        colorScheme="blue"
        aria-label="close"
        icon={<AiOutlineCloseCircle fontSize="26px" />}
        onClick={handleClose}
      />
      <Box w="800px" m="100px auto 0">
        <Flex>
          <Flex
            borderRadius="20px"
            height="300px"
            width="200px"
            mr="30px"
            bgColor="gray.200"
            justifyContent="center"
            alignItems="center"
          >
            {/* <Image
              src={`${baseURL}` + book.imgs?.[0]?.url}
              border="none"
              height="250px"
              width="150px"
              fit="fill"
            /> */}
            <Image
              src={book.cover}
              border="none"
              height="250px"
              width="150px"
              fit="fill"
            />
          </Flex>

          <Flex direction="column" justifyContent="space-between">
            <Text fontSize="lg" fontWeight="600">
              Title: {book.bookname}
            </Text>
            <Text fontSize="lg" fontWeight="600">
              ISBN: {book.isbn}
            </Text>
            <Text fontSize="lg" fontWeight="600">
              Book Condition: {book.condition}
            </Text>
            <Text fontSize="lg" fontWeight="600">
              Price: {book.price} ￡
            </Text>
            <div>
              <Button
                size="lg"
                mr="10px"
                isLoading={mutation.isLoading}
                isDisabled={isInCart || isMyBook || mutation.isSuccess}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                isDisabled={isMyBook}
                size="lg"
                mr="10px"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button
                isDisabled={isMyBook}
                size="lg"
                onClick={handleContactSeller}
              >
                Contact Seller
              </Button>
            </div>
          </Flex>
        </Flex>
        {/* <Flex mt="30px">
          {book.imgs.map(img => (
            <Image
              src={`${baseURL}` + img.url}
              border="none"
              height="200px"
              width="150px"
              fit="fill"
            />
          ))}
        </Flex> */}
        <Comment
          comments={comments?.data || []}
          book={book}
          user={userContext.user}
        />
      </Box>
    </div>
  );
}

function Comment({ comments, book, user }) {
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();

  function handleEnter(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  function handleInputChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  const commentMutate = useMutation(createComment, {
    onSuccess: data => {
      queryClient.invalidateQueries('comments')
      // console.log(data)
      // setAllComments(prev => [...prev, data.data]);
    },
  });

  const handleSend = function () {
    const comment = {
      comment: input,
      book: book.id,
      user: user.id,
    };
    console.log(comment)
    setInput('');
    commentMutate.mutate(comment);
  };

  console.log(comments)

  return (
    <Box mt="50px">
      <Text fontSize="26px" fontWeight="600" mb="10px">All Comments</Text>
      <Textarea
        mb="10px"
        resize="none"
        value={input}
        onChange={handleInputChange}
        onKeyUp={handleEnter}
      />
      <Flex justifyContent="flex-end" mb="30px">
        <Button onClick={handleSend}>Send</Button>
      </Flex>
      {comments.length === 0 ? (
        <Text>No Comments</Text>
      ) : (
        comments.map((comment, index) => (
          <div key={comment.id}>
            {index > 0 ? <Divider m="10px 0" /> : null}
            <Flex alignItems="center">
              <Avatar size="sm" name={comment.user.username} mr="10px" />
              <Text>{comment.comment}</Text>
            </Flex>
          </div>
        ))
      )}
    </Box>
  );
}
