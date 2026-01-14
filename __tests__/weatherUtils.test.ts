import { describe, it } from 'node:test';
import { getDailyForecast } from '../app/utils/weatherUtils';

describe('Weather Data Parsing', () => {
  it('should parse forecast data correctly and return daily forecasts with all required fields', () => {
    const mockForecastData = {
      list: [
        {
          dt: 1700827200, // Nov 24, 2023 12:00 PM
          main: {
            temp: 72.7,
            temp_min: 68.3,
            temp_max: 75.9,
            humidity: 65
          },
          weather: [
            {
              main: 'Clouds',
              description: 'scattered clouds',
              icon: '03d'
            }
          ]
        },
        {
          dt: 1700913600, // Nov 25, 2023 12:00 PM
          main: {
            temp: 80,
            temp_min: 76,
            temp_max: 82,
            humidity: 55
          },
          weather: [
            {
              main: 'Clear',
              description: 'clear sky',
              icon: '01d'
            }
          ]
        }
      ]
    };

    const result = getDailyForecast(mockForecastData);

    // Should return correct number of days
    expect(result).toHaveLength(2);
    
    // Should have all required properties
    expect(result[0]).toHaveProperty('day');
    expect(result[0]).toHaveProperty('temp');
    expect(result[0]).toHaveProperty('condition');
    expect(result[0]).toHaveProperty('humidity');
    expect(result[0]).toHaveProperty('icon');
    
    // Should round temperature values
    expect(result[0].temp).toBe(73); // Rounded from 72.7
    expect(result[0].tempMin).toBe(68); // Rounded from 68.3
    expect(result[0].tempMax).toBe(76); // Rounded from 75.9
    
    // Should extract correct weather data
    expect(result[0].condition).toBe('Clouds');
    expect(result[0].humidity).toBe(65);
    expect(result[1].condition).toBe('Clear');
  });
});
