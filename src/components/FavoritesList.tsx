import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'

interface FavoritesListProps {
  favorites: Array<{
    name: string;
    lat: number;
    lon: number;
  }>;
  onSelect: (lat: number, lon: number) => void;
  onRemove: (cityName: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onSelect, onRemove }) => {
  if (favorites.length === 0) return null

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-lg font-semibold mb-4 flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <FaStar className="text-yellow-500" />
        Favori Şehirler
      </motion.h2>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {favorites.map(city => (
            <motion.div
              key={city.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 
                       backdrop-blur-md rounded-lg shadow-sm group hover:shadow-md
                       transition-all duration-200"
            >
              <FaMapMarkerAlt className="text-gray-400 group-hover:text-accent transition-colors" />
              <motion.button
                onClick={() => onSelect(city.lat, city.lon)}
                className="text-gray-700 dark:text-gray-300 hover:text-accent 
                         dark:hover:text-accent transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {city.name}
              </motion.button>
              <motion.button
                onClick={() => onRemove(city.name)}
                className="text-yellow-500 hover:text-yellow-600 transition-colors ml-2"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaStar />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default FavoritesList 