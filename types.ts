
export interface WeatherData {
  location: Location;
  current: Current;
  forecast: Forecast;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Current {
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_kph: number;
  pressure_mb: number;
  humidity: number;
  feelslike_c: number;
  vis_km: number;
  uv: number;
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  day: Day;
  astro: Astro;
}

export interface Day {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  avghumidity: number;
  condition: Condition;
}

export interface Astro {
  sunrise: string;
  sunset: string;
}
