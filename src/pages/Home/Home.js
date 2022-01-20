import React from 'react';
import { Box } from '@chakra-ui/react';
import SideBar from './SideBar';

import { renderRoutes } from 'react-router-config';

export default function Home({route}) {
  return (
    <Box h="100vh" display="flex">
      <Box width="25%" px={10} bgColor="#f5f4f7">
        <SideBar />
      </Box>
      <Box overflow="auto" flex='1'>
        {renderRoutes(route.routes)}
      </Box>
    </Box>
  );
}
