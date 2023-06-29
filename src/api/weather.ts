import axios from 'axios';
import {ParamsApi, Weather} from '../types/app';
import {API_URL, API_KEY} from '@env';

/*forecast endpoint*/
const forecastEndpoint = (params: ParamsApi) =>
  `${API_URL}/forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params.days}`;
/*search endpoint*/
const locationsEndpoint = (params: ParamsApi) =>
  `${API_URL}/search.json?key=${API_KEY}&q=${params.cityName}`;

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
