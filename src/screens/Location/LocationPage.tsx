// LocationPage.tsx
import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import KakaoMap from '~/components/KakaoMap';

export default function LocationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleMapLoaded = () => {
    console.log('Map loading completed');
    setIsLoading(false);
    setHasError(false);
  };

  const handleMapError = () => {
    console.log('Map loading failed');
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-1">
        
        {/* 로딩 오버레이 */}
        {isLoading && (
          <View className="absolute inset-0 z-10 bg-white bg-opacity-80 justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="mt-4 text-gray-600">지도를 불러오는 중...</Text>
          </View>
        )}

        {/* 에러 상태 */}
        {hasError && (
          <View className="flex-1 justify-center items-center">
            <Text className="text-red-500 text-lg font-bold mb-4">
              지도 로딩에 실패했습니다
            </Text>
            <Text className="text-gray-600 text-center">
              인터넷 연결을 확인하거나{'\n'}앱을 다시 시작해보세요
            </Text>
          </View>
        )}

        {/* 지도 컴포넌트 */}
        {!hasError && (
          <KakaoMap
            latitude={37.5665}
            longitude={126.978}
            className="flex-1 overflow-hidden"
            onMapLoaded={handleMapLoaded}
          />
        )}
      </View>
    </SafeAreaView>
  );
}