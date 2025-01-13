import { useState, useEffect } from 'react'

interface FavoriteCity {
  name: string;
  lat: number;
  lon: number;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteCity[]>(() => {
    const saved = localStorage.getItem('favoriteCities')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (city: FavoriteCity) => {
    setFavorites(prev => {
      if (prev.some(f => f.name === city.name)) return prev
      return [...prev, city]
    })
  }

  const removeFavorite = (cityName: string) => {
    setFavorites(prev => prev.filter(city => city.name !== cityName))
  }

  const isFavorite = (cityName: string) => {
    return favorites.some(city => city.name === cityName)
  }

  return { favorites, addFavorite, removeFavorite, isFavorite }
} 