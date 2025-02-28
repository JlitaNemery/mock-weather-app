import { useSearchParams } from 'react-router-dom';
import { City } from '../common/types';
import { useQueryClient } from '@tanstack/react-query';
import { useWeather } from '../hooks/useWeather';
import { PARAM_CITY, PARAM_UNITS, UNITS_C, UNITS_F } from '../common/consts';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
  HStack,
  VStack,
  Button,
  ModalFooter,
  Spinner,
} from '@chakra-ui/react';

export default function CityDetailsModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cityName = searchParams.get(PARAM_CITY);
  const units = searchParams.get(PARAM_UNITS) || UNITS_C;

  const queryClient = useQueryClient();
  const citiesData = queryClient.getQueryData<City[]>(['citiesData']);
  const city = citiesData?.find((c) => c.name === cityName);

  const closeModal = () => {
    searchParams.delete(PARAM_CITY);
    setSearchParams(searchParams);
  };

  const {
    data: weather,
    isLoading,
    isError,
  } = useWeather({
    latitude: city?.coords.lat || 0,
    longitude: city?.coords.lng || 0,
    units: units === UNITS_F ? 'fahrenheit' : 'celsius',
  });

  if (!city) return null;

  return (
    <Modal isOpen={true} onClose={closeModal} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent maxH="80vh" overflow="hidden" borderRadius="2xl" position="relative">
        <Box
          bgImage={city.image}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="0"
        />

        <ModalHeader zIndex="2" color="white" bg="rgba(0, 0, 0, 0.5)">
          {city.name} Weather
        </ModalHeader>
        <ModalCloseButton zIndex="2" color="white" />

        <ModalBody overflowY="auto" padding="1rem" maxH="60vh" position="relative" zIndex="2" color="white" bg="rgba(0, 0, 0, 0.5)">
          <Text fontWeight="bold">{city.country}</Text>
          <Text mb={4}>{city.description}</Text>

          {isLoading && <Spinner size="xl" color="blue.500" />}
          {isError && <Text color="red.500">Error loading weather data.</Text>}

          {weather && (
            <>
              <Box mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                  Current Weather
                </Text>
                <HStack spacing={4}>
                  <VStack align="start">
                    <Text>
                      Temperature: {Math.round(weather.current_weather.temperature)}° {units === UNITS_C ? 'C' : 'F'}
                    </Text>
                    <Text>Wind Speed: {weather.current_weather.windspeed} m/s</Text>
                  </VStack>
                </HStack>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  3-Day Forecast
                </Text>
                <HStack spacing={1} overflowX="hidden" alignItems="stretch">
                  {weather.daily.time.slice(1, 4).map((date: string, index: number) => (
                    <Box key={date} borderRadius="lg" boxShadow="sm" p={4} textAlign="center" bg="rgba(0, 0, 0, 0.5)">
                      <Text color="white">{new Date(date).toLocaleDateString()}</Text>
                      <Text color="white">
                        Min Temp: {Math.round(weather.daily.temperature_2m_min[index])}° {units === UNITS_C ? 'C' : 'F'}
                      </Text>
                      <Text color="white">
                        Max Temp: {Math.round(weather.daily.temperature_2m_max[index])}° {units === UNITS_C ? 'C' : 'F'}
                      </Text>
                      <Text color="white">Precipitation: {weather.daily.precipitation_sum[index]} mm</Text>
                      <Text color="white">Max Wind Speed: {weather.daily.windspeed_10m_max[index]} m/s</Text>
                    </Box>
                  ))}
                </HStack>
              </Box>
            </>
          )}
        </ModalBody>

        <ModalFooter zIndex="2" bg="rgba(0, 0, 0, 0.5)">
          <Button onClick={closeModal}>Back</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
