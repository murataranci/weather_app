import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import { useFavorites } from '../hooks/useFavorites'
import { locationService } from '../services/locationService'
import { turkeyData } from '../data/turkeyData'

// Interface'leri en üstte tanımlayalım
interface LocationService {
  getCities: () => Promise<CityApiResponse[]>;
  getDistricts: (cityName: string) => Promise<string[]>;
}

interface City {
  name: string;
  districts: string[];
}


interface CityApiResponse {
  name: string;
}

interface SearchBarProps {
  onSearch: (city: string) => void;
  isInitialSearch?: boolean;
}

interface SearchResult {
  cityName: string;
  districtName?: string;
  displayName: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isInitialSearch = true }) => {
  const [query, setQuery] = useState<string>('')
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const { favorites } = useFavorites()
  const [cities, setCities] = useState<City[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Şehirleri ve ilçeleri yükle
  useEffect(() => {
    const loadCities = async () => {
      try {
        setIsLoading(true)
        const citiesData: CityApiResponse[] = await locationService.getCities()

        // Her şehir için ilçeleri yükle
        const citiesWithDistricts: City[] = await Promise.all(
          citiesData.map(async (city: CityApiResponse): Promise<City> => {
            const districts: string[] = await locationService.getDistricts(city.name as keyof typeof turkeyData);
            return {
              name: city.name,
              districts: districts || [], // districts undefined ise boş array döndür
            };
          })
        );
           
        setCities(citiesWithDistricts)
      } catch (error) {
        console.error('Error loading cities:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCities()
  }, [])

  // Şehir ve ilçe önerilerini filtrele
  const filteredResults = useMemo(() => {
    if (query.length < 3) return [];
    
    const normalizedQuery = query.toLowerCase().replace('i', 'İ');
    const results: SearchResult[] = [];

    cities.forEach(city => {
      // Şehir adı eşleşiyorsa ekle
      if (city.name.toLowerCase().replace('i', 'İ').includes(normalizedQuery)) {
        results.push({
          cityName: city.name,
          displayName: city.name
        });
      }

      // İlçe adı eşleşiyorsa ekle
      if (city.districts && Array.isArray(city.districts)) {
        city.districts.forEach(district => {
          if (typeof district === 'string' && district.toLowerCase().replace('i', 'İ').includes(normalizedQuery)) {
            results.push({
              cityName: city.name,
              districtName: district,
              displayName: `${district}, ${city.name}`
            });
          }
        });
      }
    });

    return results.slice(0, 5);
  }, [query, cities]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setQuery('')
      setIsFocused(false)
    }
  }

  const handleCitySelect = (result: SearchResult) => {
    // İlçe seçildiyse ilçe adını, yoksa şehir adını kullan
    onSearch(result.districtName || result.cityName);
    setQuery('');
    setIsFocused(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mb-8 px-4"
    >
      <form onSubmit={handleSubmit} className="relative">
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 -m-2 bg-blue-100/50 dark:bg-blue-900/30 
                       rounded-2xl blur-xl"
            />
          )}
        </AnimatePresence>

        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400">
              <FaMapMarkerAlt className="text-xl" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Şehir arayın..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 
                       bg-white/80 dark:bg-gray-800/80 backdrop-blur-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500
                       transition-all duration-200 text-lg"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 
                     hover:from-blue-600 hover:to-blue-700
                     text-white font-medium rounded-xl shadow-lg 
                     shadow-blue-500/25 hover:shadow-blue-500/35
                     flex items-center gap-2 transition-all duration-200"
          >
            <FaSearch className="text-xl" />
            <span className="hidden sm:inline">Ara</span>
          </motion.button>
        </div>

        {/* Arama Önerileri, Favoriler ve Popüler Şehirler */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 mt-2 p-4 bg-white dark:bg-gray-800 
                       rounded-xl shadow-xl border border-gray-200 dark:border-gray-700
                       z-50"
            >
              {/* Arama Önerileri */}
              {query.length >= 3 && filteredResults.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Arama Sonuçları
                  </h3>
                  <div className="flex flex-col gap-1">
                    {filteredResults.map((result) => (
                      <motion.button
                        key={result.displayName}
                        type="button"
                        onClick={() => handleCitySelect(result)}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/30
                                rounded-lg text-gray-700 dark:text-gray-300
                                transition-all duration-200"
                      >
                        {result.displayName}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Favoriler */}
              {favorites.length > 0 && query.length < 3 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    Favori Şehirler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {favorites.map((city) => (
                      <motion.button
                        key={city.name}
                        type="button"
                        onClick={() => handleCitySelect({ cityName: city.name, displayName: city.name })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-yellow-50 dark:bg-yellow-900/30 
                                hover:bg-yellow-100 dark:hover:bg-yellow-900/50
                                rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300
                                border border-yellow-200 dark:border-yellow-900/50
                                transition-all duration-200"
                      >
                        {city.name}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popüler Şehirler - Sadece ilk aramada, favoriler yoksa ve arama yapmıyorken */}
              {isInitialSearch && favorites.length === 0 && query.length < 3 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Popüler Şehirler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'].map((city) => (
                      <motion.button
                        key={city}
                        type="button"
                        onClick={() => handleCitySelect({ cityName: city, displayName: city })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 
                                hover:bg-blue-50 dark:hover:bg-blue-900/30
                                rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300
                                border border-gray-200 dark:border-gray-700
                                transition-all duration-200"
                      >
                        {city}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  )
}

export default SearchBar 