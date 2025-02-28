import { useSearchParams } from 'react-router-dom';
import { Box, Select as ChakraSelect, Text } from '@chakra-ui/react';

interface SearchProps {
  title: string;
  list: string[];
  paramName: string;
  defaultValue: string;
}

export default function Select({ title, list, paramName, defaultValue }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramVal = searchParams.get(paramName) || defaultValue;

  const updateSearchParams = (value: string) => {
    if (value) {
      searchParams.set(paramName, value);
    } else {
      searchParams.delete(paramName);
    }
    setSearchParams(searchParams);
  };

  return (
    <Box width="258px">
      <Text fontSize="sm" color="gray.600" mb={1} textAlign="left">
        {title}
      </Text>
      <ChakraSelect value={paramVal} onChange={(e) => updateSearchParams(e.target.value)} mb={4} margin={0}>
        <option value={defaultValue}>{defaultValue}</option>
        {list.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </ChakraSelect>
    </Box>
  );
}
