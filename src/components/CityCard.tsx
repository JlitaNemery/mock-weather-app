import { useSearchParams } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import { City } from '../common/types';
import { IMAGE_DEFAULT_URL } from '../common/consts';

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const openModal = () => {
    searchParams.set('city', city.name);
    setSearchParams(searchParams);
  };

  return (
    <Box
      position="relative"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      cursor="pointer"
      onClick={openModal}
      _hover={{ transform: 'scale(1.05)', transition: 'all 0.3s' }}
      height="250px"
      backgroundImage={`url(${city.image || IMAGE_DEFAULT_URL})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Box position="absolute" top="0" left="0" width="100%" bgGradient="linear(to-b, rgba(0, 0, 0, 0.7), transparent)" color="white" p={3}>
        <Text fontWeight="bold" fontSize="lg">
          {city.name}
        </Text>
        <Text fontWeight="bold" fontSize="md">
          {city.country}
        </Text>
        <Text fontSize="sm">{city.description}</Text>
      </Box>
    </Box>
  );
}
