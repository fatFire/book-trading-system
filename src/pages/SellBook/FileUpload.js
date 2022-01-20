import React, { useState, useRef } from 'react';
import { Box, Button, Icon, Input, Text, Image, Grid } from '@chakra-ui/react';
import { AiFillFileAdd, AiFillDelete } from 'react-icons/ai';

const DEFAULT_TOTAL_FILE_SIZE_IN_BYTES = 25000000;
const KILO_BYTES_PER_BYTE = 1000;

const convertBytesToKB = bytes => Math.round(bytes / KILO_BYTES_PER_BYTE);
const convertNestedObjectToArray = nestedObj =>
  Object.keys(nestedObj).map(key => nestedObj[key]);

export default function FileUpload({
  updateFilesCb = () => {},
  totalFileSizeInBytes = DEFAULT_TOTAL_FILE_SIZE_IN_BYTES,
  ...otherProps
}) {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const callUpdateFilesCb = files => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const addNewFiles = newFiles => {
    let totalSize = 0;
    for (let file of newFiles) {
      if (file.size + totalSize <= totalFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
        totalSize += file.size;
      }
    }
    return { ...files };
  };

  const handleNewFileUpload = e => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = fileName => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <Box>
      <Box
        position="relative"
        mb="15px"
        border="2px dotted lightgray"
        padding="20px 10px"
        borderRadius="6px"
        display="flex"
        flexDir="column"
        alignItems="center"
      >
        <Text fontSize="20px" fontWeight="bold" textAlign="center">
          Drag and drop your files anywhere or
        </Text>
        <Button
          type="button"
          cursor="pointer"
          position="relative"
          zIndex="1"
          mt="10px"
          onClick={handleUploadBtnClick}
        >
          <Icon as={AiFillFileAdd} mr="5px" />
          <span> Upload {otherProps.multiple ? 'files' : 'a file'}</span>
        </Button>
        <Input
          fontSize="18px"
          display="block"
          border="none"
          textTransform="none"
          width="100%"
          height="auto"
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          _focus="none"
          opacity="0"
          type="file"
          onChange={handleNewFileUpload}
          ref={fileInputField}
          title=""
          value=""
          {...otherProps}
        />
      </Box>
      <Box>
        <span>To Upload</span>
        <Grid
          justifyContent="space-between"
					rowGap="10px"
          gridTemplateColumns="repeat(auto-fill, 19%)"
          mt="10px"
        >
          {Object.keys(files).map((fileName, index) => {
            let file = files[fileName];
            let isImageFile = file.type.split('/')[0] === 'image';
            return (
              <Box
                key={fileName}
                boxSizing="border-box"
                height="120px"
                borderRadius="6px"
                overflow="hidden"
                position="relative"
                _hover={{
                  opacity: 0.55,
                  '.FileMetaData': {
                    display: 'flex',
                  },
                }}
              >
                {isImageFile && (
                  <Image
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    src={URL.createObjectURL(file)}
                    alt={`file preview ${index}`}
                  />
                )}
                <Box
                  className="FileMetaData"
                  display={isImageFile ? 'none' : 'flex'}
                  flexDir="column"
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  color="white"
                  fontSize="12px"
                  fontWeight="bold"
                  bgColor="rgba(5, 5, 5, 0.55)"
                  padding="5px"
                >
                  <Text isTruncated>{file.name}</Text>
                  <Box mt="auto" display="flex" justifyContent="space-between">
                    <Text isTruncated>{convertBytesToKB(file.size)} KB</Text>
                    <Icon
                      as={AiFillDelete}
                      fontSize="18px"
                      cursor="pointer"
                      _hover={{
                        transform: 'scale(1.3)',
                      }}
                      onClick={() => removeFile(fileName)}
                    />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
