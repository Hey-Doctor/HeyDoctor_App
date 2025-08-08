import { useState } from 'react';
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

export default function Home_Main() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [city, setCity] = useState('서울시');
  const [dongGu, setDongGu] = useState('양천구 신정동');

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('위치 권한이 필요합니다');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);

    const addr = await getAddressFromCoords(loc.coords.latitude, loc.coords.longitude);
    setAddress(addr);
  };

  const getAddressFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: 'KakaoAK 63e456faac2c82ccf10db8911595efc4',
          },
        }
      );

      const data = await response.json();
      if (data.documents && data.documents.length > 0) {
        const region = data.documents[0].address;
        const region1 = region.region_1depth_name;
        const region2 = region.region_2depth_name;
        const region3 = region.region_3depth_name;
        const cityName = region2.split(' ')[0];
        const guDong = region2.split(' ')[1] + ' ' + region3;
        const fullAddress = `${region1} ${region2} ${region3}`;
        setCity(cityName);
        setDongGu(guDong);
        return fullAddress;
      } else {
        return '주소 정보를 찾을 수 없습니다.';
      }
    } catch (error) {
      console.error(error);
      return '주소 변환 중 오류 발생';
    }
  };

  return (
    <View className="w-[351px] h-[358px] bg-default-color shadow-custom rounded-2xl relative">
      {/* 인삿말 */}
      <Text className="absolute top-[61px] left-[16px] text-[17px] font-bold text-neutral-950">
        김곰돌님,
      </Text>
      <Text className="absolute top-[82px] left-[16px] text-[17px]">
        오늘도 안전하고{'\n'}행복한 하루 보내세요!
      </Text>

      {/* 마스코트 이미지 */}
      <Image
        source={require('../../assets/mascot.png')}
        className="absolute w-[227px] h-[227px] top-[42px] left-[143px]"
      />

      {/* 현재 위치 타이틀 */}
      <Text className="absolute top-[177px] left-[16px] font-bold text-[20px]">
        현재 위치
      </Text>

      {/* 새로고침 버튼 */}
      <TouchableOpacity
        className="absolute top-[173px] left-[98px] w-[30px] h-[30px] bg-component-color rounded-full justify-center items-center"
        onPress={getLocation}
      >
        <Image
          source={require('../../assets/refresh.png')}
          className="w-[15px] h-[15px] tint-black"
        />
      </TouchableOpacity>

      {/* 위치 정보 텍스트 */}
      <Text className="absolute top-[206px] left-[17px] text-[16px] font-bold">{city}</Text>
      <Text className="absolute top-[225px] left-[17px] text-[24px] font-bold">{dongGu}</Text>

      {/* 병원 확인 버튼 */}
      <TouchableOpacity className="absolute top-[283px] left-[17px] w-[315px] h-[52px] rounded-lg bg-component-color shadow-custom justify-center">
        <View className="flex-row items-center justify-center">
          <Image
            source={require('../../assets/mascot_icon.png')}
            className="w-[35px] h-[35px] mr-2"
          />
          <Text className="text-white text-base font-bold">가까운 병원 확인하기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}