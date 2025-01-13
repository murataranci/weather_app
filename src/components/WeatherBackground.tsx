import React from 'react';
import './WeatherBackground.css';

interface WeatherBackgroundProps {
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'partly-cloudy';
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weatherType }) => {
  return (
    <div className={`weather-background ${weatherType}`}>
      {weatherType === 'rainy' && (
        <div className="rain">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="drop" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.3}s`
            }} />
          ))}
        </div>
      )}
      
      {(weatherType === 'cloudy' || weatherType === 'partly-cloudy') && (
        <div className="clouds">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="cloud" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 30}s`,
              animationDuration: `${60 + Math.random() * 30}s`
            }} />
          ))}
        </div>
      )}

      {weatherType === 'sunny' && (
        <div className="sun">
          <div className="rays" />
        </div>
      )}

      {weatherType === 'snowy' && (
        <div className="snow">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="snowflake" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherBackground; 