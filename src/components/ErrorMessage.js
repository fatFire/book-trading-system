import React from 'react'
import { Box } from '@chakra-ui/layout'

export default function ErrorMessage(props) {
  
  return (
    <Box color="red" >
      {`* ${props.children}`}
    </Box>
  )
}
