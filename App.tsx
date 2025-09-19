import React from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherIcon from './components/WeatherIcon';
import InfoCard from './components/InfoCard';
import ForecastCard from './components/ForecastCard';
import MoonPhaseCard from './components/MoonPhaseCard';
import { Thermometer, Wind, Droplets, Sun, Eye, Gauge, Sunrise, Sunset, AlertTriangle } from 'lucide-react';

const getBackgroundClass = (conditionCode: number, isDay: boolean): string => {
    if (!isDay) return 'from-indigo-900 to-gray-900'; // Night
    if (conditionCode === 1000) return 'from-blue-400 to-sky-600'; // Sunny
    if (conditionCode >= 1003 && conditionCode <= 1009) return 'from-slate-500 to-gray-700'; // Cloudy
    if (conditionCode >= 1063 && conditionCode <= 1201) return 'from-blue-600 to-gray-800'; // Rain
    if (conditionCode >= 1204 && conditionCode <= 1237) return 'from-gray-400 to-blue-500'; // Snow
    if (conditionCode >= 1273) return 'from-gray-800 to-indigo-900'; // Thunder
    return 'from-gray-700 to-gray-900'; // Default
};


const App: React.FC = () => {
    const { weatherData, loading, error, setLocation } = useWeather('London');

    const handleSearch = (newLocation: string) => {
        setLocation(newLocation);
    };

    const backgroundClass = weatherData ? getBackgroundClass(weatherData.current.condition.code, weatherData.current.is_day === 1) : 'from-gray-700 to-gray-900';

    return (
        <main className={`min-h-screen w-full bg-gradient-to-br ${backgroundClass} text-white font-sans p-4 sm:p-8 transition-colors duration-500`}>
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                <SearchBar onSearch={handleSearch} initialLocation="London" />

                {loading && (
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                    </div>
                )}
                {error && (
                    <div className="text-center bg-red-900/50 border border-red-500/50 text-red-300 p-4 rounded-lg flex flex-col items-center gap-2">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                        <h2 className="text-xl font-bold">An Error Occurred</h2>
                        <p>{error}</p>
                    </div>
                )}

                {weatherData && (
                    <>
                        {/* Current Weather Section */}
                        <section className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                            <div className="flex flex-col items-center md:items-start">
                                <h1 className="text-4xl md:text-5xl font-bold">{weatherData.location.name}</h1>
                                <p className="text-gray-300">{weatherData.location.country}</p>
                                <p className="text-7xl md:text-8xl font-bold mt-4">{Math.round(weatherData.current.temp_c)}°C</p>
                                <p className="text-xl capitalize">{weatherData.current.condition.text}</p>
                            </div>
                            <div className="flex-shrink-0">
                                <WeatherIcon code={weatherData.current.condition.code} isDay={weatherData.current.is_day === 1} className="w-32 h-32 md:w-48 md:h-48" />
                            </div>
                        </section>

                        {/* Additional Info Cards */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Today's Highlights</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <InfoCard icon={<Thermometer size={20} />} title="Feels Like" value={`${Math.round(weatherData.current.feelslike_c)}°`} />
                                <InfoCard icon={<Wind size={20} />} title="Wind Speed" value={weatherData.current.wind_kph} unit="kph" />
                                <InfoCard icon={<Droplets size={20} />} title="Humidity" value={weatherData.current.humidity} unit="%" />
                                <InfoCard icon={<Sun size={20} />} title="UV Index" value={weatherData.current.uv} />
                                <InfoCard icon={<Eye size={20} />} title="Visibility" value={weatherData.current.vis_km} unit="km" />
                                <InfoCard icon={<Gauge size={20} />} title="Pressure" value={weatherData.current.pressure_mb} unit="mb" />
                                <InfoCard icon={<Sunrise size={20} />} title="Sunrise" value={weatherData.forecast.forecastday[0].astro.sunrise} />
                                <InfoCard icon={<Sunset size={20} />} title="Sunset" value={weatherData.forecast.forecastday[0].astro.sunset} />
                                <MoonPhaseCard date={weatherData.forecast.forecastday[0].date} />
                            </div>
                        </section>

                        {/* 3-Day Forecast */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4">3-Day Forecast</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {weatherData.forecast.forecastday.map((day) => (
                                    <ForecastCard key={day.date} dayData={day} />
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </main>
    );
};

export default App;
