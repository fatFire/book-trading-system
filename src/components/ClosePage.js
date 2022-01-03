import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useHistory } from 'react-router';

export default function ClosePage(props) {
  const history = useHistory();

  const handleClose = () => {
    history.push("/")
  };

  return (
    <IconButton
      position="fixed"
      right="10px"
      top="10px"
      colorScheme="blue"
      aria-label="close"
      icon={<AiOutlineCloseCircle fontSize="26px" />}
      onClick={handleClose}
    />
  );
}
