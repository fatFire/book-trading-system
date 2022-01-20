import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient, } from 'react-query';
import { useHistory, useParams, } from 'react-router';
import { Avatar, Box, Button, Divider, Flex, IconButton, Image, Text, Textarea, } from '@chakra-ui/react';
import CartContext from '../../context/CartContext';
import UserContext from '../../context/UserContex';
import { addToCart, createComment, findAllComments, findOrCreateConversation, } from './api';

export default function Details() {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { cart, setCart } = CartContext.useContainer();
  const { user } = UserContext.useContainer();
  const token = window.localStorage.getItem('jwt');

  const isInCart = cart.books?.some(book => book.id === id) || false;

  const book = queryClient
    .getQueryData('allbooks')
    .find(item => item.id === id);

  const { data: comments } = useQuery(
    'comments',
    () => {
      return findAllComments(book.id);
    },
    {
      enabled: !!book,
    }
  );

  const isMyBook = book['users_permissions_user']?.id === user.id;

  const handleClose = () => {
    history.push('/');
  };

  const mutationFn = function (id) {
    const books = cart.books?.map(book => book.id);
    books.push(id);
    const data = {
      books,
    };
    return addToCart(cart.id, data, { token });
  };

  const mutation = useMutation(mutationFn, {
    onSuccess: data => {
      setCart(data);
    },
  });

  const createConversation = useMutation(
    data => {
      return findOrCreateConversation(data, { token });
    },
    {
      onSuccess: data => {
        history.push(`/contact/${data.id}`, {
          conversation: data,
        });
      },
    }
  );

  const handleAddToCart = function () {
    if (!user.id) {
      history.push('/signin');
    } else {
      mutation.mutate(id);
    }
  };

  const handleBuyNow = () => {
    if (!user.id) {
      history.push('/signin');
    } else {
      history.push('/payment', {
        books: [book],
        totalamount: book.price,
      });
    }
  };

  const handleContactSeller = () => {
    if (!user.id) {
      history.push('/signin');
    } else {
      createConversation.mutate({
        book: book.id,
        users: [user.id, book['users_permissions_user'].id],
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
        <Comment comments={comments || []} book={book} user={user} />
      </Box>
    </div>
  );
}

function Comment({ comments, book, user }) {
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();
  const token = window.localStorage.getItem('jwt');
  const history = useHistory();

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

  const commentMutate = useMutation(
    data => {
      return createComment(data, { token });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comments');
      },
    }
  );

  const handleSend = function () {
    if (!user.id) {
      history.push('/signin');
      return;
    }
    const comment = {
      comment: input,
      book: book.id,
      user: user.id,
    };
    setInput('');
    commentMutate.mutate(comment);
  };

  return (
    <Box mt="50px">
      <Text fontSize="26px" fontWeight="600" mb="10px">
        All Comments
      </Text>
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
              <Avatar size="sm" name={comment.user?.username} mr="10px" />
              <Text>{comment.comment}</Text>
            </Flex>
          </div>
        ))
      )}
    </Box>
  );
}
