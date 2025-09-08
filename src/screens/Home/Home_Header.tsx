import { View, Image } from 'react-native';
import React from 'react';

export default function Home_Header() {
  return (
    <View className="w-full h-[75px] p-4 flex-row items-center justify-between bg-[#F1FAF1] rounded-2xl shadow-custom elevation-custom">
      <Image source={require('~/assets/screens/HomeAssets/heyDoctorSmallLOGO1.png')} />

      <View className="flex-row gap-2 items-center">
        <View className="w-[40px] h-[40px] rounded-full bg-[#82CD7B] items-center justify-center">
          <Image
            source={require('~/assets/screens/HomeAssets/customer1.png')}
            className="w-[25px] h-[25px]"
          />
        </View>
        <Image source={require('~/assets/screens/HomeAssets/alarmButton1.png')} />
      </View>
    </View>
  );
}