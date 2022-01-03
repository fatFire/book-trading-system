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
import { Wrap } from './Wrap';
import { Redirect } from 'react-router';
import User from '../context/UserContex';

export default function AddBook() {
  const toast = createStandaloneToast();
  const history = useHistory();
  const user = User.useContainer();
  console.log(user)
  const token = JSON.parse(window.localStorage.getItem('jwt'))
  
  const formik = useFormik({
    initialValues: {
      bookname: '',
      author: '',
      isbn: '',
      description: '',
      price: 0,
      category: undefined,
      condition: undefined,
      imgs: [],
    },
    onSubmit: null,
  });

  const mutationFn = () => {
    const formData = new FormData();
    const data = {};
    data["users_permissions_user"] = user.user.id
    const values = formik.values;
    for (let key in values) {
      if (key === 'imgs') {
        Array.from(values[key]).forEach(item => {
          let name = item.name.split(".")
          name[0] = name[0].slice(0,12)
          name = name.join(".")
          formData.append(`files.${key}`, item, name);
        });
      } else {
        data[key] = values[key];
      }
    }

    formData.append('data', JSON.stringify(data));
    return axios.post('http://localhost:1337/books', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  };

  const mutation = useMutation(mutationFn, {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Successfully added a book',
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
        Add a Book
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
            defaultValue={0}
            min={0}
            precision={2}
            placeholder="Enter Price"
            size="lg"
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
