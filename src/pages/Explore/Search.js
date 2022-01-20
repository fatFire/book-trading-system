import React, { useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  filter,
  NumberInput,
  NumberInputField,
  Flex,
  Select,
} from '@chakra-ui/react';
import { AiOutlineSearch, AiOutlineBars, AiOutlineReload } from 'react-icons/ai';
import { useQuery } from 'react-query';
import axios from 'axios';
import * as qs from 'qs';

export default function Search({filters, setFilters, refetch}) {


  const handleInputChange = event => {
    setFilters(prevState => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = () => {
    refetch();
  };

  const handleClear = () => {
    setFilters({
      min: '',
      max: '',
      bookname: '',
      condition: '',
      category: ''
    })
  }

  return (
    <Box w="500px" >
      <InputGroup >
        <InputLeftElement >
          <Menu closeOnSelect={false} autoSelect={false} >
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<AiOutlineBars fontSize="20px" />}
              variant="outline"
            />
            <MenuList width="500px" p="20px">
              <Flex alignItems="center" mb="20px">
                <Box width="100px">{`Price(￡) : `}</Box>
                <NumberInput
                  mr="10px"
                  defaultValue={0}
                  precision={2}
                  min={0}
                >
                  <NumberInputField
                    name="min"
                    onChange={handleInputChange}
                    value={filters.min}
                  />
                </NumberInput>
                ~
                <NumberInput
                  ml="10px"
                  defaultValue={0}
                  precision={2}
                  min={0}
                >
                  <NumberInputField
                    name="max"
                    onChange={handleInputChange}
                    value={filters.max}
                  />
                </NumberInput>
              </Flex>
              <Flex alignItems="center" mb="20px">
                <Box width="100px">Condition :</Box>
                <Select
                  ml="10px"
                  placeholder="Select Book Condition"
                  name="condition"
                  value={filters.condition}
                  onChange={handleInputChange}
                >
                  <option value="New">New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </Select>
              </Flex>
              <Flex alignItems="center">
                <Box width="100px">Category :</Box>
                <Select
                  ml="10px"
                  placeholder="Select Book Category"
                  name="category"
                  value={filters.category}
                  onChange={handleInputChange}
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
              </Flex>
            </MenuList>
          </Menu>
        </InputLeftElement>
        <Input
          name="bookname"
          value={filters.bookname}
          onChange={handleInputChange}
          placeholder="Search books by name, author and isbn"
        />
        <InputRightElement width="80px">
          <IconButton
            aria-label="Search database"
            icon={<AiOutlineReload fontSize="20px" />}
            onClick={handleClear}
          />
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<AiOutlineSearch fontSize="20px" />}
            onClick={handleSubmit}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
