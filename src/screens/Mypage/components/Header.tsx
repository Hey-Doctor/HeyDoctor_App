import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // 아이콘 - Material

export default function Header() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
        <View className="px-5 py-4 border-b border-neutral-200 flex-row justify-between">
            <Text className="text-xl font-bold">MY</Text>
            <MaterialCommunityIcons name="cog" size={22} />
        </View>
    </SafeAreaView>
  );
}