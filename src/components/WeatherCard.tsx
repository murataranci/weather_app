import React from 'react'
import { motion } from 'framer-motion'
import { WeatherData } from '../types/weather'
import { useApp } from '../context/AppContext'
import { FaStar } from 'react-icons/fa'

interface WeatherCardProps {
  weatherData: WeatherData;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  weatherData,
  isFavorite, 
  onToggleFavorite 
}) => {
  const { convertTemperature, temperatureUnit } = useApp()
  const unitSymbol = temperatureUnit === 'celsius' ? '°C' : '°F'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {weatherData.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 capitalize">
            {weatherData.weather[0].description}
          </p>
        </div>
        <button
          onClick={onToggleFavorite}
          className={`p-2 rounded-full transition-colors ${
            isFavorite 
              ? 'text-yellow-400 hover:text-yellow-500' 
              : 'text-gray-400 hover:text-gray-500'
          }`}
        >
          <FaStar size={24} />
        </button>
      </div>

      <div className="mt-4 flex items-center">
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
          className="w-20 h-20"
        />
        <div className="ml-4">
          <p className="text-4xl font-bold text-gray-800 dark:text-white">
            {Math.round(convertTemperature(weatherData.main.temp))}{unitSymbol}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Hissedilen: {Math.round(convertTemperature(weatherData.main.feels_like))}{unitSymbol}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300 text-sm">Nem</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            {weatherData.main.humidity}%
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300 text-sm">Rüzgar</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            {weatherData.wind.speed} m/s
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default WeatherCard 