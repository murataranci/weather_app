import React, { createContext, useContext, useState, useEffect } from 'react'

interface AppContextType {
  temperatureUnit: 'celsius' | 'fahrenheit';
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  convertTemperature: (temp: number) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>('celsius')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAutoMode, setIsAutoMode] = useState(true) // Otomatik mod kontrolü için

  // Otomatik tema değişimi için saat kontrolü
  const checkTime = () => {
    const currentHour = new Date().getHours()
    return currentHour >= 19 || currentHour < 7
  }

  // Sayfa yüklendiğinde ve her saat başı tema kontrolü
  useEffect(() => {
    if (isAutoMode) {
      // İlk yüklemede kontrol et
      setIsDarkMode(checkTime())

      // Her dakika kontrol et (saat değişimini yakalamak için)
      const interval = setInterval(() => {
        setIsDarkMode(checkTime())
      }, 60000) // 60 saniye

      return () => clearInterval(interval)
    }
  }, [isAutoMode])

  // HTML elementine dark class'ını ekle/kaldır
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsAutoMode(false) // Manuel değişimde otomatik modu kapat
    setIsDarkMode(prev => !prev)
  }

  const convertTemperature = (temp: number): number => {
    if (temperatureUnit === 'fahrenheit') {
      return (temp * 9/5) + 32
    }
    return temp
  }

  const value = {
    temperatureUnit,
    isDarkMode,
    toggleDarkMode,
    convertTemperature,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
} 