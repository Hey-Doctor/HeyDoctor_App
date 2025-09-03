import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // 아이콘 - Material

export default function Header() {
  return (
    <SafeAreaView className="bg-white" edges={['top']}>
        <View className="px-5 py-4 border-b border-neutral-200 flex-row">
            <MaterialCommunityIcons name="chevron-left" size={30} />
            <Text className="text-[20px] font-bold">응급</Text>
        </View>
    </SafeAreaView>
  );
}