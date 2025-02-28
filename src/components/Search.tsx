import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { Box, Input, InputGroup, InputRightElement, IconButton, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useSearchParams } from 'react-router-dom';
import { PARAM_SEARCH } from '../common/consts';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState('');
  const value = useDebounce(text, 400);

  useEffect(() => {
    if (value) {
      searchParams.set(PARAM_SEARCH, value);
    } else {
      searchParams.delete(PARAM_SEARCH);
    }
    setSearchParams(searchParams);
  }, [value]);

  const clearSearch = () => {
    setText('');
    searchParams.delete(PARAM_SEARCH);
    setSearchParams(searchParams);
  };

  return (
    <Box maxWidth="200px">
      <Text fontSize="sm" color="gray.600" mb={1} textAlign="left">
        Search:
      </Text>
      <InputGroup>
        <Input
          value={text}
          placeholder="Search here"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        {text && (
          <InputRightElement>
            <IconButton aria-label="Clear search" icon={<CloseIcon />} size="sm" onClick={clearSearch} />
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
}
