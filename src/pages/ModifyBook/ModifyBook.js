import React, { useState, useEffect } from 'react';
import {
  Flex,
  Avatar,
  IconButton,
  Text,
  Link,
  Icon,
  Box,
  Grid,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  Heading,
  Image,
  Select,
  GridItem,
  Button,
  FormControl,
  FormLabel,
  createStandaloneToast,
} from '@chakra-ui/react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Wrap } from '../../component/Wrap';
import { Redirect } from 'react-router';
import User from '../../context/UserContex';
import { modifyBook } from './api';

export default function ModifyBook() {
  const toast = createStandaloneToast();
  const history = useHistory();
  const user = User.useContainer();
  const book = history.location.state.book;
  console.log(book);
  console.log(user);
  const token = window.localStorage.getItem('jwt');

  const formik = useFormik({
    initialValues: {
      bookname: book.bookname,
      author: book.author,
      isbn: book.isbn,
      description: book.description,
      price: book.price,
      category: book.category.id,
      condition: book.condition,
      imgs: [],
    },
    onSubmit: null,
  });

  const mutationFn = () => {
    const formData = new FormData();
    const data = {};
    data['users_permissions_user'] = user.user.id;
    const values = formik.values;
    for (let key in values) {
      if (key === 'imgs') {
        Array.from(values[key]).forEach(item => {
          let name = item.name.split('.');
          name[0] = name[0].slice(0, 12);
          name = name.join('.');
          formData.append(`files.${key}`, item, name);
        });
      } else {
        data[key] = values[key];
      }
    }

    formData.append('data', JSON.stringify(data));
    return modifyBook(book.id, formData, { token });
  };

  const mutation = useMutation(mutationFn, {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Successfully modified a book',
        status: 'success',
        position: 'top',
        isClosable: true,
      });
      history.goBack();
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  const handleClose = () => {
    history.goBack();
  };

  return (
    <Wrap pt="100px">
      {!!token ? null : <Redirect to="/signin" />}
      <IconButton
        position="fixed"
        right="10px"
        top="10px"
        colorScheme="blue"
        aria-label="close"
        icon={<AiOutlineCloseCircle fontSize="26px" />}
        onClick={handleClose}
      />
      <Heading fontSize="26px" w="500px" m="0 auto 30px" textAlign="center">
        Modify Book
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" w="50%" m="0 auto" gap={10}>
        <FormControl id="bookname" isRequired>
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Book Name:
          </FormLabel>
          <Input
            placeholder="Enter Book Name"
            size="lg"
            {...formik.getFieldProps('bookname')}
          />
        </FormControl>
        <FormControl id="isbn" isRequired>
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            ISBN:
          </FormLabel>
          <Input
            placeholder="Enter ISBN"
            size="lg"
            {...formik.getFieldProps('isbn')}
          />
        </FormControl>
        <FormControl id="author">
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Author:
          </FormLabel>
          <Input
            placeholder="Enter Author"
            size="lg"
            {...formik.getFieldProps('author')}
          />
        </FormControl>
        <FormControl id="category">
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Category:
          </FormLabel>
          <Select
            placeholder="Select Category"
            size="lg"
            {...formik.getFieldProps('category')}
          >
            <option value="6187b85e5615176c74d1a874">Art</option>
            <option value="6187b8715615176c74d1a875">Biography</option>
            <option value="6187b87d5615176c74d1a876">Business</option>
            <option value="6187b88e5615176c74d1a877">Children's</option>
            <option value="6187b89b5615176c74d1a878">Classics</option>
            <option value="6187b8ad5615176c74d1a879">Comics</option>
            <option value="618556675615176c74d1a873">
              Computers & Technology
            </option>
            <option value="617145b265f7fbb1cc746a61">Fantasy</option>
            <option value="6187b8bb5615176c74d1a87a">Fiction</option>
            <option value="6187b8cc5615176c74d1a87b">History</option>
            <option value="6187b8d85615176c74d1a87c">Horror</option>
            <option value="6187b8eb5615176c74d1a87e">Music</option>
            <option value="6187b8f65615176c74d1a87f">Mystery</option>
            <option value="6187b9075615176c74d1a880">Poetry</option>
            <option value="6187b9175615176c74d1a881">Psychology</option>
            <option value="6187b9225615176c74d1a882">Science</option>
            <option value="6187b92f5615176c74d1a883">Sports</option>
            <option value="6187b93c5615176c74d1a884">Thriller</option>
            <option value="6187b94d5615176c74d1a885">Travel</option>
          </Select>
        </FormControl>
        <FormControl id="condition" isRequired>
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Book Conditon:
          </FormLabel>
          <Select
            placeholder="Select Book Condition"
            size="lg"
            {...formik.getFieldProps('condition')}
          >
            <option value="New">New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </Select>
        </FormControl>
        <FormControl id="price" isRequired>
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Price(￡):
          </FormLabel>
          <NumberInput
            min={0}
            precision={2}
            placeholder="Enter Price"
            size="lg"
            defaultValue={formik.getFieldProps('price').value}
          >
            <NumberInputField {...formik.getFieldProps('price')} />
          </NumberInput>
        </FormControl>
        <FormControl id="imgs">
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Book Images:
          </FormLabel>
          <Input
            placeholder="Upload Book Images"
            size="lg"
            type="file"
            accept="image/*"
            multiple
            onChange={event => {
              formik.setFieldValue('imgs', event.target.files);
            }}
          />
        </FormControl>
        <FormControl id="description">
          <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
            Discription:
          </FormLabel>
          <Textarea
            placeholder="Enter Description"
            resize="none"
            {...formik.getFieldProps('description')}
          />
        </FormControl>
        <GridItem colStart={2} justifySelf="end">
          <Button size="lg" onClick={handleClose} mr="20px">
            Cancel
          </Button>
          <Button size="lg" colorScheme="blue" onClick={handleSubmit}>
            Submit
          </Button>
        </GridItem>
      </Grid>
    </Wrap>
  );
}
