import React from 'react';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

interface DayDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  dayData: {
    dt: number;
    hourly: Array<{
      dt: number;
      temp: number;
      pop: number;
      weather: Array<{
        description: string;
        icon: string;
      }>;
    }>;
  } | null;
}

// Chart.js bileşenlerini kaydet
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DayDetailPopup: React.FC<DayDetailPopupProps> = ({ isOpen, onClose, dayData }) => {
  if (!isOpen || !dayData) return null;

  const tempData = dayData.hourly.map(hour => ({
    time: new Date(hour.dt * 1000).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    temp: hour.temp
  }));

  const rainData = dayData.hourly.map(hour => ({
    time: new Date(hour.dt * 1000).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    chance: hour.pop * 100
  }));

  // Sıcaklık grafiği için veri
  const tempChartData = {
    labels: tempData.map(item => item.time),
    datasets: [
      {
        label: 'Sıcaklık (°C)',
        data: tempData.map(item => item.temp),
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Yağış olasılığı grafiği için veri
  const rainChartData = {
    labels: rainData.map(item => item.time),
    datasets: [
      {
        label: 'Yağış Olasılığı (%)',
        data: rainData.map(item => item.chance),
        fill: true,
        borderColor: 'rgb(53, 162, 235)',
        tension: 0.1
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {new Date(dayData.dt * 1000).toLocaleDateString()}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Sıcaklık Grafiği */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
            Saatlik Sıcaklık Değişimi
          </h3>
          <div className="h-[240px] w-full">
            <Line data={tempChartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false
                }
              }
            }} />
          </div>
        </div>

        {/* Yağış Olasılığı Grafiği */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
            Saatlik Yağış Olasılığı
          </h3>
          <div className="h-[240px] w-full">
            <Line data={rainChartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DayDetailPopup; 