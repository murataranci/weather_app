import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWeather } from '../hooks/useWeather'
import { useFavorites } from '../hooks/useFavorites'
import WeatherCard from '../components/WeatherCard'
import ForecastList from '../components/ForecastList'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import SearchBar from '../components/SearchBar'
import FavoritesList from '../components/FavoritesList'
import { weatherService } from '../services/weatherService'
import Header from '../components/Header'

const WeatherDashboard: React.FC = () => {
  const [location, setLocation] = useState<{lat: number; lon: number} | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)
  
  // useWeather hook'unu kullanarak hava durumu verilerini al
  const { currentWeather, forecast } = useWeather(
    location?.lat ?? 0,
    location?.lon ?? 0
  )
  
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

  // Konum bilgisini al
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
          setHasLocation(true)
        },
        (error) => {
          console.error("Konum alınamadı:", error)
          setError("Konum bilgisi alınamadı. Lütfen bir şehir arayın.")
          setHasLocation(false)
        }
      )
    }
  }, [])

  // Şehir araması yap
  const handleSearch = async (city: string) => {
    try {
      setError(null)
      const coords = await weatherService.getCoordinatesByCity(city)
      setLocation(coords)
      setHasSearched(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    }
  }

  // Favorilere ekleme/çıkarma işlemi
  const handleToggleFavorite = () => {
    if (!currentWeather.data) return

    const city = {
      name: currentWeather.data.name,
      lat: location?.lat ?? 0,
      lon: location?.lon ?? 0
    }

    if (isFavorite(city.name)) {
      removeFavorite(city.name)
    } else {
      addFavorite(city)
    }
  }

  return (
    <motion.div 
      className="max-w-6xl mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
        <Header />
      </div>

      <div className="sticky top-[72px] z-40 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg py-2 mb-8">
        <SearchBar 
          onSearch={handleSearch} 
          isInitialSearch={!hasSearched && !hasLocation}
        />
      </div>

      <AnimatePresence mode="wait">
        {favorites.length > 0 && (
          <motion.div key="favorites">
            <FavoritesList
              favorites={favorites}
              onSelect={(lat, lon) => setLocation({ lat, lon })}
              onRemove={removeFavorite}
            />
          </motion.div>
        )}

        {error && (
          <motion.div key="error" className="mb-4">
            <ErrorMessage message={error} />
          </motion.div>
        )}

        {(currentWeather.isLoading || forecast.isLoading) && (
          <motion.div key="loading" className="my-8">
            <LoadingSpinner />
          </motion.div>
        )}

        {currentWeather.data && !currentWeather.isLoading && (
          <motion.div key="weather">
            <WeatherCard
              weatherData={currentWeather.data}
              isFavorite={isFavorite(currentWeather.data.name)}
              onToggleFavorite={handleToggleFavorite}
            />
          </motion.div>
        )}

        {forecast.data && !forecast.isLoading && (
          <motion.div key="forecast">
            <ForecastList data={forecast.data} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default WeatherDashboard 