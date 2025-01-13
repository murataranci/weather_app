import { useQuery } from '@tanstack/react-query'
import { weatherService } from '../services/weatherService'

export const useWeather = (lat: number, lon: number) => {
  const currentWeather = useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => weatherService.getCurrentWeather(lat, lon),
    enabled: lat !== 0 && lon !== 0
  })

  const forecast = useQuery({
    queryKey: ['forecast', lat, lon],
    queryFn: () => weatherService.getForecast(lat, lon),
    enabled: lat !== 0 && lon !== 0
  })

  return { currentWeather, forecast }
} 