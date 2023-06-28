import axios from 'axios';
import {apiKey} from '../constants/constants';
import {ParamsApi, Weather} from '../types/app';

const forecastEndpoint = (params: ParamsApi) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}`;
const locationsEndpoint = (params: ParamsApi) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint: string): Promise<Weather | {}> => {
  const options = {
    method: 'GET',
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return {};
  }
};

export const fetchWeatherForecast = (params: ParamsApi) => {
  let forecastUrl = forecastEndpoint(params);
  return apiCall(forecastUrl);
};

export const fetchLocations = (params: ParamsApi) => {
  let locationsUrl = locationsEndpoint(params);
  return apiCall(locationsUrl);
};
