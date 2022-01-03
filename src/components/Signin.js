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
import { Wrap } from './Wrap';
import ClosePage from './ClosePage';
import AdminSignin from './AdminSignin';
import UserSignin from './UserSignin';


export default function Signin() {
  
  const [index, setIndex] = useState(0)


  return (
    <Wrap pt="200px">
      <ClosePage />
      <Tabs size="lg" Box w="520px" m="0 auto 20px" defaultIndex={0} onChange={(index) => setIndex(index)}>
        <TabList>
          <Tab>User</Tab>
          <Tab>Admin</Tab>
        </TabList>
      </Tabs>
      {index === 0 ? <UserSignin /> : <AdminSignin />}
    </Wrap>
  );
}
