import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
          color: 'blue.800'
        },
        _focus: {
          boxShadow: 'none'
        }
      }
    }
  },
});
export default theme;
