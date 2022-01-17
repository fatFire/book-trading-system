import React, { useState } from 'react';
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
  Button,
  Grid,
  GridItem,
  chakra,
  useToast,
  createStandaloneToast,
  Link,
  Checkbox,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { Wrap } from '../../component/Wrap';
import ClosePage from '../../component/ClosePage';
import AdminSignin from './AdminSignin';
import UserSignin from './UserSignin';

export default function Signin() {


  return (
    <Wrap pt="200px">
      <Tabs
        size="lg"
        Box
        w="520px"
        m="0 auto 20px"
        defaultIndex={0}
      >
        <TabList>
          <Tab>User</Tab>
          <Tab>Admin</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserSignin />
          </TabPanel>
          <TabPanel>
            <AdminSignin />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Wrap>
  );
}
