import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import KakaoMap from '~/components/KakaoMap';
import BottomSheet, { BottomSheetState } from '~/components/BottomSheet';

const { height: screenHeight } = Dimensions.get('window');

export default function LocationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>('collapsed');

  const handleMapLoaded = () => {
    console.log('Map loading completed');
    setIsLoading(false);
    setHasError(false);
  };

  const handleBottomSheetStateChange = (state: BottomSheetState) => {
    setBottomSheetState(state);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-1">
        
        {isLoading && (
          <View className="absolute inset-0 z-10 bg-white bg-opacity-80 justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="mt-4 text-gray-600">지도를 불러오는 중...</Text>
          </View>
        )}

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

        {!hasError && (
          <KakaoMap
            latitude={37.5665}
            longitude={126.978}
            className="flex-1 overflow-hidden"
            onMapLoaded={handleMapLoaded}
          />
        )}

        <BottomSheet
          initialState="collapsed"
          onStateChange={handleBottomSheetStateChange}
        >
          <View className="p-6">
            <Text className="text-center text-gray-700">
              바텀시트 콘텐츠 영역 ddd
            </Text>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
}