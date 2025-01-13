import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WeatherDashboard from './pages/WeatherDashboard'
import { AppProvider } from './context/AppContext'

// QueryClient'ı oluştur
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 dakika
    },
  },
})

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <WeatherDashboard />
        </div>
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App 