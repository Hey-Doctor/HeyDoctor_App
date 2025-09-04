import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '~/auth/AuthContext';
import Header from './components/Header';
import MyPage_Menu from './MyPage_Menu';

export default function MyPage_Login() {
  const { user, logout } = useAuth();
  return (
    <>
      <View className="flex-1 bg-white">
        <Header/>
        <View className="flex-1 items-center justify-center gap-3">
          <TouchableOpacity
            onPress={() => console.log('Pressed')}
            className="bg-white shadow-custom p-4 rounded-[15px] w-[345px] h-[137px] relative"
          >
            <Image
              source={require('../../assets/profile.jpeg')}
              className="w-[125px] h-[125px] rounded-full absolute left-[8px] top-[6px]"
            />
            <Text className="text-black text-[17px] font-bold absolute left-[148px] top-[47px]">
              {user?.name}
            </Text>
            <Text className="text-zinc-600 text-[10px] absolute left-[148px] top-[69px]">
              {user?.email}
            </Text>
            <MaterialIcons name="chevron-right" className="absolute left-[315px] top-[58px]" size={20} />
          </TouchableOpacity>


          <View className="mt-6"> 
            <MyPage_Menu/>
          </View>

          <Text className="font-extrabold mt-[36px]">ver 1.0.70</Text>

          <TouchableOpacity
            className="bg-component-color w-[100px] h-[28px] rounded-full flex-row items-center justify-center"
            onPress={logout}
          >
            <Image
              source={require('../../assets/mascot_icon.png')}
              className="w-[20px] h-[20px] mr-2"
            />
            <Text className="text-white font-semibold">로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}