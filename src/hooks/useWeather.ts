import { useQuery } from '@tanstack/react-query';

interface WeatherParams {
  latitude: number;
  longitude: number;
  units?: 'celsius' | 'fahrenheit';
}

export const useWeather = ({ latitude, longitude, units = 'celsius' }: WeatherParams) => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,windspeed_10m_max&temperature_unit=${units}&timezone=auto`;

  return useQuery({
    queryKey: ['weatherData', latitude, longitude, units],
    queryFn: async () => {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    }
  });
};
