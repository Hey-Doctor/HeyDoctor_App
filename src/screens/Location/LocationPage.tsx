import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions, Image } from 'react-native';
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
          <View className="flex flex-col p-4 gap-8 border border-gray-400">
            {/* 안전 문자 내용 칸 */}
            <View className='w-full p-[10px] gap-3 elevation-md bg-[#F1FAF1] rounded-2xl'>
                {/* 안전 문자 내용 버튼이랑 텍스트 = 제목 */}
                <View className='flex flex-row items-center gap-3'>
                    <Image source={require('~/assets/screens/LocationPageAssets/informButton.png')} />
                    <Text className='text-xl font-semibold'>안전 문자 내용</Text>
                </View>    
                <Text>Json으로 받아서 뿌리면 될듯</Text>
            </View>
            {/* 안전 문자 내용 칸 END */}

            <View className='w-full p-[10px] gap-3 elevation-md bg-[#E6EEFF] rounded-2xl'>
                {/* 안전 문자 내용 버튼이랑 텍스트 = 제목 */}
                <View className='flex flex-row items-center gap-3'>
                    <Text className='text-xl'>안전 문자 내용</Text>
                </View>    
                <Text>Json으로 받아서 뿌리면 될듯</Text>
            </View>

            <Text className="text-center text-gray-700">
              바텀시트 콘텐츠 영역 ddd
            </Text>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
}