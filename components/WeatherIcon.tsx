
import React from 'react';
import { Sun, Moon, Cloud, CloudSun, CloudMoon, CloudRain, CloudSnow, CloudLightning, Wind, CloudFog, CloudDrizzle } from 'lucide-react';

interface WeatherIconProps {
  code: number;
  isDay: boolean;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, isDay, className = 'w-16 h-16' }) => {
  const iconProps = { className, strokeWidth: 1.5 };

  switch (code) {
    case 1000: // Sunny / Clear
      return isDay ? <Sun {...iconProps} /> : <Moon {...iconProps} />;
    case 1003: // Partly cloudy
      return isDay ? <CloudSun {...iconProps} /> : <CloudMoon {...iconProps} />;
    case 1006: // Cloudy
    case 1009: // Overcast
      return <Cloud {...iconProps} />;
    case 1030: // Mist
    case 1135: // Fog
    case 1147: // Freezing fog
      return <CloudFog {...iconProps} />;
    case 1063: // Patchy rain possible
    case 1180: // Patchy light rain
    case 1183: // Light rain
    case 1240: // Light rain shower
      return <CloudDrizzle {...iconProps} />;
    case 1066: // Patchy snow possible
    case 1210: // Patchy light snow
    case 1213: // Light snow
    case 1255: // Light snow showers
      return <CloudSnow {...iconProps} />;
    case 1087: // Thundery outbreaks possible
    case 1273: // Patchy light rain with thunder
    case 1276: // Moderate or heavy rain with thunder
      return <CloudLightning {...iconProps} />;
    case 1189: // Moderate rain
    case 1192: // Heavy rain at times
    case 1195: // Heavy rain
    case 1243: // Moderate or heavy rain shower
    case 1246: // Torrential rain shower
       return <CloudRain {...iconProps} />;
    case 1114: // Blowing snow
    case 1117: // Blizzard
    case 1219: // Moderate snow
    case 1222: // Patchy heavy snow
    case 1225: // Heavy snow
    case 1258: // Moderate or heavy snow showers
      return <CloudSnow {...iconProps} />;
    case 1150: // Patchy light drizzle
    case 1153: // Light drizzle
    case 1168: // Freezing drizzle
    case 1171: // Heavy freezing drizzle
      return <CloudDrizzle {...iconProps} />;
    default:
      return isDay ? <Sun {...iconProps} /> : <Moon {...iconProps} />;
  }
};

export default WeatherIcon;
