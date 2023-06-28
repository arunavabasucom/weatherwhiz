import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {CalendarDaysIcon} from 'react-native-heroicons/outline';
import DailyForecastContainer from './DailyForecastContainer';
import {Forecastday, ScrollViewForecastProps} from '../types/app';
import {theme} from '../themes/main';

const ScrollViewForecast = ({
  weather,
  weatherIcon,
}: ScrollViewForecastProps) => {
  const containerStyle = {paddingHorizontal: 15};
  return (
    <View className="mb-2 space-y-3">
      <View className="flex-row items-center mx-5 space-x-2">
        <CalendarDaysIcon size="22" color="white" />
        <Text className="text-white text-base">Daily forecast</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={containerStyle}
        showsHorizontalScrollIndicator={false}>
        {weather?.forecast?.forecastday?.map(
          (item: Forecastday, index: any) => {
            /*day name*/
            const date = new Date(item.date);
            let dayName = date.toLocaleDateString('en-US', {weekday: 'long'});
            dayName = dayName.split(',')[0];
            /*background*/
            const background = theme.bgWhite(0.15);
            /*average temperature*/
            const avgTemp: number = item.day.avgtemp_c;
            return (
              <View key={index}>
                <DailyForecastContainer
                  backgroundColor={background}
                  dayName={dayName}
                  temperature={avgTemp}
                  weatherIcon={weatherIcon}
                />
              </View>
            );
          },
        )}
      </ScrollView>
    </View>
  );
};

export default ScrollViewForecast;
