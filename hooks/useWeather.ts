import { useState, useEffect, useCallback } from 'react';
import { WeatherData } from '../types';
import { fetchWeatherData } from '../services/weatherService';

const API_KEY = 'a3b723b069d741cfae1160249251109';

export const useWeather = (initialLocation: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>(initialLocation);

  const fetchWeather = useCallback(async (loc: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(loc, API_KEY);
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(location);
  }, [location, fetchWeather]);

  return { weatherData, loading, error, location, setLocation, refetch: fetchWeather };
};
