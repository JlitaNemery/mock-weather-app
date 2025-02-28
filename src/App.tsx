import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import MainView from './pages/MainView';
import data from '../data.json';
import { City } from './common/types';
import { PARAM_CITY } from './common/consts';
import { Spinner } from '@chakra-ui/react';

const CityDetailsModal = lazy(() => import('./pages/CityDetailsModal'));

export default function App() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    const cachedData = queryClient.getQueryData(['citiesData']);
    if (!cachedData) {
      queryClient.setQueryData(['citiesData'], data.cities as City[]);
    }
  }, [queryClient]);

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainView />} />
      </Routes>

      {location.search.includes(`${PARAM_CITY}=`) && (
        <Suspense fallback={<Spinner size="lg" color="blue.500" margin="auto" />}>
          <CityDetailsModal />
        </Suspense>
      )}
    </>
  );
}
