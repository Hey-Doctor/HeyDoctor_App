import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '~/auth/AuthContext';
import MyPage_Menu from './MyPage_Menu';

export default function MyPage_Logout() {
  const { login } = useAuth(); // 임시: 클릭 시 가짜 로그인
  return (
    <View className="gap-3">
      <Text className="text-xl font-bold">로그인이 필요합니다</Text>
      <TouchableOpacity className="bg-black h-[44px] rounded-md items-center justify-center" onPress={login}>
        <Text className="text-white font-semibold">임시 로그인</Text>
      </TouchableOpacity>
      <MyPage_Menu/>
    </View>
  );
}