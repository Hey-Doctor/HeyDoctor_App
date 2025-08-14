import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '~/auth/AuthContext';
import Header from './components/Header';

export default function MyPage_Login() {
  const { user, logout } = useAuth();
  return (
    <>
      <Header/>
      <View className="gap-3">
        <TouchableOpacity
          onPress={() => console.log('Pressed')}
          className="bg-white shadow-custom p-4 rounded-[15px] w-[342px] h-[137px]"
        >
          <Text className=" text-center text-black text-[17px] font-bold ">{user?.name}</Text>
          <Text className=" text-center text-zinc-600 text-[10px] ">{user?.email}</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold">{user?.name}님 환영합니다</Text>
        <TouchableOpacity className="bg-neutral-100 h-[44px] rounded-md items-center justify-center" onPress={logout}>
          <Text className="font-semibold">로그아웃</Text>
        </TouchableOpacity>
        
      </View>
    </>
  );
}