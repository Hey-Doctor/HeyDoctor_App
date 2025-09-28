import React from 'react';
import { View, Text } from 'react-native';

interface WeatherProps {
  sigungu?: string; // 시군구
  eupmyeondong?: string;
  temperature?: string; // 온도
  humidity?: string; // 습도
}

interface WeatherInfoProps {
  data: WeatherProps | null;
}

export default function WeatherInfo({ data }: WeatherInfoProps) {
  if (!data) {
    return null;
  }
  
  return (
    <View className="w-full p-4 gap-3 bg-[#E6EEFF] rounded-2xl">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl font-semibold">현재 날씨</Text>
        <Text className="text-sm text-gray-500">{data.sigungu} {data.eupmyeondong}</Text>
      </View>
      
      <View className="flex flex-row items-end gap-2">
        <Text className="text-4xl font-bold">{data.temperature}°C</Text>
      </View>

      <View className="flex flex-row flex-wrap gap-x-6">
        <Text className="text-sm">
          <Text className="font-semibold">습도:</Text> {data.humidity}%
        </Text>
      </View>
    </View>
  );
}