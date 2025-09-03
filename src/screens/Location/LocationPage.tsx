import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import KakaoMap from '~/components/KakaoMap';
import BottomSheet, { BottomSheetState } from '~/components/BottomSheet';

import MapButton from './Location_components/MapButton';
import SafetyAlertMessage from './Location_components/SafetyAlertMessage';
import { find } from 'eslint.config';

const { height: screenHeight } = Dimensions.get('window');

export default function LocationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>('collapsed');

  const [findLocation, setFindLocation] = useState('');

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
        
        {/* 검색 칸 */}
        <View className="absolute w-full top-4 pointer-events-auto">
            <View className='flex-row justify-around'>
                <View className='flex flex-row  items-center gap-1 p-2 px-10 bg-white rounded-full elevation-xl'>
                    <Image source={require('~/assets/screens/LocationPageAssets/LocationFindIcon.png')} 
                        className='w-[25px] h-[25px]' />
                    <TextInput
                        placeholder="무엇을 찾으세요?"
                        value={findLocation}
                        onChangeText={setFindLocation}
                    />
                </View>
            </View>
        </View>


        {/* 지도 버튼들 */}
        <View className="absolute w-full top-24 pointer-events-auto">
            <View className='flex-row justify-around px-4'>
                <MapButton text='심장 충격기' imageSource={require('~/assets/screens/LocationPageAssets/HeartIcon.png')}/>
                <MapButton text='병원' imageSource={require('~/assets/screens/LocationPageAssets/HospitalIcon.png')}/>
                <MapButton text='약국' imageSource={require('~/assets/screens/LocationPageAssets/PillIcon.png')}/>
                <MapButton text='대피소' imageSource={require('~/assets/screens/LocationPageAssets/HomeIconPink.png')}/>
            </View>
        </View>

        {/* 바텀시트 */}
        <BottomSheet
          initialState="collapsed"
          onStateChange={handleBottomSheetStateChange}
        >
          <View className="flex flex-col p-4 gap-8">
            {/* 안전 문자 내용 칸 */}
            <SafetyAlertMessage />

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