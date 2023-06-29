//@ts-nocheck
import {View, Image, StatusBar} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {debounce} from 'lodash';
import {fetchLocations, fetchWeatherForecast} from '../api/weather';
import * as Progress from 'react-native-progress';
import {weatherImages} from '../constants/constants';
import {getData, storeData} from '../utils/asyncStroage';
import ScrollViewForecast from '../components/ScrollViewForecast';
import ForecastSection from '../components/ForecastSection';
import SearchField from '../components/SearchField';

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});

  const handleSearch = (search: any) => {
    if (search && search.length > 2) {
      fetchLocations({cityName: search}).then(data => {
        setLocations(data);
      });
    }
  };
  const handleLocation = (loc: any) => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then((data: any) => {
      setLoading(false);
      setWeather(data);
      storeData('city', loc.name);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'New Delhi';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '3',
    }).then((data: any) => {
      setWeather(data);
      setLoading(false);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  //@ts-ignore
  const {location, current} = weather;
  const weatherIcon = weatherImages[current?.condition?.text || 'other'];
  console.log('weatherIcon', weatherIcon);
  return (
    <View className="flex-1 relative">
      <StatusBar barStyle={'light-content'} />
      <Image
        blurRadius={80}
        source={require('../../assets/images/bgg.png')}
        className="absolute w-full h-full"
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.Bar thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          {/* search section */}
          <SearchField
            handleLocation={handleLocation}
            handleTextDebounce={handleTextDebounce}
            locations={locations}
            showSearch={showSearch}
            toggleSearch={toggleSearch}
          />

          {/* forecast section */}
          <ForecastSection
            current={current}
            location={location}
            weather={weather}
            weatherIcon={weatherIcon}
          />

          {/* forecast for next days */}
          <ScrollViewForecast weather={weather} weatherIcon={weatherIcon} />
        </SafeAreaView>
      )}
    </View>
  );
}
