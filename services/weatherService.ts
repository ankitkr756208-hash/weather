import { WeatherData } from '../types';

const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

export const fetchWeatherData = async (location: string, apiKey: string): Promise<WeatherData> => {
  if (!apiKey) {
    throw new Error('Weather API key is not provided.');
  }

  const url = `${BASE_URL}?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || 'Location not found.');
  }

  const data = await response.json();
  return data as WeatherData;
};
