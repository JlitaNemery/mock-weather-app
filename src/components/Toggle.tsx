import { useSearchParams } from 'react-router-dom';
import { Box, ButtonGroup, Button, Text } from '@chakra-ui/react';

interface ToggleProps {
  title: string;
  optionA: string;
  optionB: string;
  paramName: string;
}

export default function Toggle({ title, optionA, optionB, paramName }: ToggleProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get(paramName) || optionA;

  const toggleSort = () => {
    const newSort = sort === optionA ? optionB : optionA;
    searchParams.set(paramName, newSort);
    setSearchParams(searchParams);
  };

  return (
    <Box>
      <Text fontSize="sm" color="gray.600" mb={1} textAlign="left">
        {title}
      </Text>
      <ButtonGroup isAttached variant="outline">
        <Button onClick={toggleSort} colorScheme={sort === optionA ? 'blue' : 'gray'} className="capitalize-first-letter">
          {optionA}
        </Button>
        <Button onClick={toggleSort} colorScheme={sort === optionB ? 'blue' : 'gray'} className="capitalize-first-letter">
          {optionB}
        </Button>
      </ButtonGroup>
    </Box>
  );
}
