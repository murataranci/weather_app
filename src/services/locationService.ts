import { turkeyData } from '../data/turkeyData';

interface District {
  name: string;
  center?: boolean;
}

interface City {
  name: string;
  districts: District[];
}

class LocationService {
  async getCities(): Promise<City[]> {
    try {
      return Object.keys(turkeyData).map(city => ({
        name: city,
        districts: [] // İlçeler getDistricts ile doldurulacak
      }));
    } catch (error) {
      console.error('Şehir listesi alınırken hata:', error);
      throw error;
    }
  }

  async getDistricts(cityName: string): Promise<District[]> {
    try {
      const districts = turkeyData[cityName] || [];
      return districts.map(name => ({
        name,
        center: false
      }));
    } catch (error) {
      console.error('İlçe listesi alınırken hata:', error);
      throw error;
    }
  }
}

export const locationService = new LocationService(); 