import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '~/auth/AuthContext';
import MyPage_Menu from './MyPage_Menu';
import Header from './components/Header';

export default function MyPage_Logout() {
  const { login } = useAuth(); // 임시: 클릭 시 가짜 로그인
  return (
    <>
      <Header/>

      <View className="items-center justify-center">
        
        <View className="flex-row mt-[50px]">
          <Text className="text-[22px] font-bold">로그인이 필요한 서비스입니다</Text>
          <MaterialIcons name="chevron-right"  size={30} />
          <TouchableOpacity className="bg-white shadow-custom w-[50px] h-[26px] rounded-[20px] items-center justify-center" onPress={login}>
            <Text className="text-black text-[11px] font-extrabold">로그인</Text>
          </TouchableOpacity>
        </View>
        
        <View className="mt-[30px]">
          <MyPage_Menu />
        </View>
        
        <Text className="font-extrabold mt-[36px]">ver 1.0.70</Text>
      </View>
    </>
  );
}