import React from 'react'
import { useApp } from '../context/AppContext'
import { WiDaySunny } from 'react-icons/wi'
import { FaSun, FaMoon } from 'react-icons/fa'

const Header: React.FC = () => {
  const { temperatureUnit, isDarkMode, toggleDarkMode } = useApp()

  return (
    <header className="py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <WiDaySunny className="text-3xl text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hava Durumu
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 dark:text-gray-300">
            {temperatureUnit === 'celsius' ? '°C' : '°F'}
          </span>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                     hover:bg-gray-200 dark:hover:bg-gray-600 
                     transition-colors"
          >
            {isDarkMode ? (
              <FaSun className="w-5 h-5 text-yellow-500" />
            ) : (
              <FaMoon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header 