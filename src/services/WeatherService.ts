import axios from 'axios';

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export class WeatherService {
    async fetchWeather(city) {
        try {
            const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }

    analyzeWeather(data) {
        // Simple analysis based on weather data
        if (data.main.temp > 303.15) { // 30 degrees Celsius
            return 'It’s going to be hot today!';
        } else if (data.weather[0].main === 'Rain') {
            return 'Don’t forget your umbrella!';
        } else {
            return 'The weather seems pleasant.';
        }
    }
}

// Example usage:
// const weatherService = new WeatherService();
// const weatherData = await weatherService.fetchWeather('Berlin');
// console.log(weatherService.analyzeWeather(weatherData));
