import {View, Text, Image} from 'react-native';
import React from 'react';
import {dailyForecastContainerProps} from '../types/app';
const DailyForecastContainer = ({
  backgroundColor,
  weatherIcon,
  dayName,
  temperature,
}: dailyForecastContainerProps) => {
  return (
    <View
      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
      style={{backgroundColor: backgroundColor}}>
      <Image source={weatherIcon} className="w-11 h-11" />
      <Text className="text-white">{dayName}</Text>
      <Text className="text-white text-xl font-semibold">
        {temperature}&#176;
      </Text>
    </View>
  );
};

export default DailyForecastContainer;
