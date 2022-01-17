import React from 'react';
import { Box } from '@chakra-ui/react';
import NavBar from './NavBar';

import { renderRoutes } from 'react-router-config';

export default function Home({route}) {
  return (
    <Box h="100vh" display="flex">
      <Box minW={500} height="full" px={10} bgColor="#f5f4f7">
        <NavBar />
      </Box>
      <Box h="100vh" overflow="auto" sx={{ flex: '1' }}>
        {renderRoutes(route.routes)}
      </Box>
    </Box>
  );
}
