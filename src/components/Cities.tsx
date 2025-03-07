import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { SimpleGrid } from '@chakra-ui/react';
import { City } from '../common/types';
import CityCard from '../components/CityCard';
import { sortByOption } from '../utils/helpers';
import { PARAM_SEARCH, PARAM_CONTINENT, PARAM_SORT, SORT_NAME, CONTINENTS_ALL } from '../common/consts';

export default function Cities() {
  const [searchParams, _] = useSearchParams();
  const queryClient = useQueryClient();

  const [cities, setCities] = useState<City[]>(queryClient.getQueryData<City[]>(['citiesData']) || []);

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
      const updatedCities = queryClient.getQueryData<City[]>(['citiesData']) || [];
      setCities(updatedCities);
    });

    return () => unsubscribe();
  }, [queryClient]);

  const search = searchParams.get(PARAM_SEARCH) || '';
  const continent = searchParams.get(PARAM_CONTINENT) || CONTINENTS_ALL;
  const sort = searchParams.get(PARAM_SORT) || SORT_NAME;

  const filteredCities: City[] = cities
    .filter((city: City) => {
      return (
        city.active &&
        (city.name.toLowerCase().includes(search.toLowerCase()) || city.country.toLowerCase().includes(search.toLowerCase())) &&
        (continent === CONTINENTS_ALL || city.continent === continent)
      );
    })
    .sort((a, b) => sortByOption(sort, a, b));

  return filteredCities.length > 0 ? (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
      {filteredCities.map((city) => (
        <CityCard key={String(city.coords.lat) + String(city.coords.lng)} city={city} />
      ))}
    </SimpleGrid>
  ) : (
    <div>No cities found...</div>
  );
}
