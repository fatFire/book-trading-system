import React, { useState, useCallback } from 'react';
import {
  Flex,
  Box,
  Grid,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  Heading,
  Select,
  GridItem,
  Button,
  FormControl,
  FormLabel,
  createStandaloneToast,
} from '@chakra-ui/react';
import { useFormik, useFormikContext } from 'formik';
import { useHistory } from 'react-router';
import { useMutation, useQuery } from 'react-query';
import { Redirect } from 'react-router';
import User from '../../context/UserContex';
import { categoriesMap } from '../../common/CategoriesMap';
import { createBook, googleBookApi } from './api';
import FileUpload from './FileUpload';

export default function SellBook() {
  const [step, setStep] = useState(0);
  const toast = createStandaloneToast();
  const history = useHistory();
  const { user } = User.useContainer();
  const token = window.localStorage.getItem('jwt');

  const formik = useFormik({
    initialValues: {
      bookname: '',
      author: '',
      isbn: '',
      description: '',
      price: 0,
      cover: '',
      category: undefined,
      condition: undefined,
      imgs: [],
    },
    onSubmit: null,
  });

  useQuery(['abook'], () => googleBookApi(formik.values.isbn), {
    enabled:
      formik.values.isbn.length === 10 || formik.values.isbn.length === 13,
    onSuccess: data => {
      formik.setFieldValue('bookname', data.title);
      formik.setFieldValue('author', data.authors?.[0]);
      formik.setFieldValue('category', data.categories?.[0]);
      formik.setFieldValue('cover', data.imageLinks?.thumbnail);
    },
  });

  const mutationFn = () => {
    const formData = new FormData();
    const data = {};
    data['users_permissions_user'] = user.id;
    const values = formik.values;
    values.category = categoriesMap[values.category];
    for (let key in values) {
      if (key === 'imgs') {
        values[key].forEach(item => {
          formData.append(`files.${key}`, item, item.name);
        });
      } else {
        data[key] = values[key];
      }
    }

    formData.append('data', JSON.stringify(data));
    return createBook(formData, { token });
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
      history.replace('/');
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  const updateUploadedFiles = (files) => {
    formik.setFieldValue('imgs', files);
  };

  const updateUploadedFilesMemo = useCallback(updateUploadedFiles, [formik])

  if (!user.id) {
    return <Redirect to="/signin" />;
  }

  return (
    <Box>
      <Heading w="500px" m="50px auto" textAlign="center">
        Sell Book
      </Heading>
      {!step ? (
        <Grid templateColumns="repeat(2, 1fr)" w="80%" m="0 auto" gap={10}>
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
          <FormControl id="bookname" isRequired>
            <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
              Title:
            </FormLabel>
            <Input
              placeholder="Enter Title"
              size="lg"
              {...formik.getFieldProps('bookname')}
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
              <option value="Adult">Adult</option>
              <option value="Anthologies">Anthologies</option>
              <option value="Art">Art</option>
              <option value="Biographies">Biographies</option>
              <option value="Body">Body</option>
              <option value="Business">Business</option>
              <option value="Children">Children</option>
              <option value="Classics">Classics</option>
              <option value="Comics">Comics</option>
              <option value="Computers">Computers</option>
              <option value="Contemporary">Contemporary</option>
              <option value="Cooking">Cooking</option>
              <option value="Crime">Crime</option>
              <option value="Engineering">Engineering</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Fiction">Fiction</option>
              <option value="Food">Food</option>
              <option value="General">General</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="History">History</option>
              <option value="Horror">Horror</option>
              <option value="Investing">Investing</option>
              <option value="Literary">Literary</option>
              <option value="Literature">Literature</option>
              <option value="Manga">Manga</option>
              <option value="Media-help">Media-help</option>
              <option value="Memoirs">Memoirs</option>
              <option value="Mind">Mind</option>
              <option value="Music">Music</option>
              <option value="Mystery">Mystery</option>
              <option value="Nonfiction">Nonfiction</option>
              <option value="Poetry">Poetry</option>
              <option value="Psychology">Psychology</option>
              <option value="Religion">Religion</option>
              <option value="Romance">Romance</option>
              <option value="Science">Science</option>
              <option value="Self">Self</option>
              <option value="Spirituality">Spirituality</option>
              <option value="Sports">Sports</option>
              <option value="Superheroes">Superheroes</option>
              <option value="Technology">Technology</option>
              <option value="Thrillers">Thrillers</option>
              <option value="Travel">Travel</option>
              <option value="Women">Women</option>
              <option value="Young">Young</option>
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
          <GridItem colStart={2} justifySelf="end" alignSelf="end">
            <Button
              size="lg"
              onClick={() => {
                setStep(1);
              }}
            >
              Next
            </Button>
          </GridItem>
        </Grid>
      ) : (
        <Box w="80%" m="0 auto" flexDir="column">
          <FormControl id="imgs">
            <FormLabel fontWeight="semibold" fontSize="lg" mb={2}>
              Book Images:
            </FormLabel>
            <FileUpload

              updateFilesCb={updateUploadedFilesMemo}
            />
          </FormControl>
          <Flex flexDir="row-reverse" mt="20px">
            <Button size="lg" colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
            <Button
              size="lg"
              mr="10px"
              onClick={() => {
                setStep(0);
              }}
            >
              Prev
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
