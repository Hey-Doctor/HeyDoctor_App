import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '~/auth/AuthContext';

export default function MyPage_Login() {
  const { user, logout } = useAuth();
  return (
    <View className="gap-3">
      <Text className="text-xl font-bold">{user?.name}님 환영합니다</Text>
      <TouchableOpacity className="bg-neutral-100 h-[44px] rounded-md items-center justify-center" onPress={logout}>
        <Text className="font-semibold">로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}