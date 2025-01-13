import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ForecastData, DayData } from '../types/weather'
import { useApp } from '../context/AppContext'
import DayDetailPopup from './DayDetailPopup'

interface ForecastListProps {
  data: ForecastData;
}

interface SelectedDayData {
  dt: number;
  hourly: Array<{
    dt: number;
    temp: number;
    pop: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
}

const ForecastList: React.FC<ForecastListProps> = ({ data }) => {
  const { convertTemperature, temperatureUnit } = useApp()
  const unitSymbol = temperatureUnit === 'celsius' ? '°C' : '°F'
  const [selectedDay, setSelectedDay] = useState<SelectedDayData | null>(null)
  
  const dailyForecasts = data.list
    .filter(item => item.dt_txt.includes('12:00:00'))
    .slice(0, 5)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  const handleDayClick = (forecast: DayData) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    const hourlyData = data.list.filter(item => 
      new Date(item.dt * 1000).toLocaleDateString() === date
    );

    setSelectedDay({
      dt: forecast.dt,
      hourly: hourlyData.map(item => ({
        dt: item.dt,
        temp: item.main.temp,
        pop: item.pop,
        weather: item.weather
      }))
    });
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-8"
      >
        <motion.h2 
          className="text-xl font-semibold mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          5 Günlük Tahmin
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {dailyForecasts.map((forecast: DayData, index: number) => (
            <motion.div 
              key={forecast.dt}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg p-4 shadow-lg
                       transform transition-all duration-200 hover:shadow-xl cursor-pointer"
              onClick={() => handleDayClick(forecast)}
            >
              <div className="text-center">
                <motion.p 
                  className="text-sm text-gray-600 dark:text-gray-300 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {new Date(forecast.dt * 1000).toLocaleDateString('tr-TR', { weekday: 'long' })}
                </motion.p>
                <motion.img 
                  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                  alt={forecast.weather[0].description}
                  className="mx-auto w-16 h-16"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: index * 0.1 
                  }}
                />
                <motion.p 
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {Math.round(convertTemperature(forecast.main.temp))}{unitSymbol}
                </motion.p>
                <motion.p 
                  className="text-sm text-gray-600 dark:text-gray-300 capitalize mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {forecast.weather[0].description}
                </motion.p>
                <motion.div
                  className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Nem: {forecast.main.humidity}%
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <DayDetailPopup
        isOpen={selectedDay !== null}
        onClose={() => setSelectedDay(null)}
        dayData={selectedDay}
      />
    </>
  )
}

export default ForecastList 