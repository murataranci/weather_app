import axios from 'axios'

const API_KEY = '4d1f93b2d24706ea6d5992db0bcbb24f'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const GEO_URL = 'https://api.openweathermap.org/geo/1.0'

export const weatherService = {
  getCurrentWeather: async (lat: number, lon: number) => {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`
    )
    return response.data
  },
  
  getForecast: async (lat: number, lon: number) => {
    const response = await axios.get(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`
    )
    return response.data
  },

  getCoordinatesByCity: async (city: string) => {
    const response = await axios.get(
      `${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`
    )
    if (response.data.length === 0) {
      throw new Error('Şehir bulunamadı')
    }
    return {
      lat: response.data[0].lat,
      lon: response.data[0].lon
    }
  }
} 