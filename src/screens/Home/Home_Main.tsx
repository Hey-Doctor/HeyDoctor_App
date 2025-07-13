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
  
      // 역지오코딩 호출 * 해당 작업을 해야 불러온 위도/경도를 기준으로 시/구/동 으로 변환해서 가져오기 가능
      const addr = await getAddressFromCoords(loc.coords.latitude, loc.coords.longitude);
      setAddress(addr);
    };
  
    const getAddressFromCoords = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
          {
            headers: {
              Authorization: 'KakaoAK 63e456faac2c82ccf10db8911595efc4', // 키 앞에 KakaoAK를 사용해야 인식함
            },
          }
        );
  
        const data = await response.json();
        console.log(data);
  
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
    <View 
        className=" bg-default-color"
        style={{ 
            width: 351, 
            height: 358, 
            borderRadius: 20,
            position: 'relative',
        }}
    >
        <Text 
            className=" text-neutral-950 font-bold"
            style={{
                position: 'absolute',
                top: 61,
                left: 16,
                fontSize: 17,
            }}
        >
            김곰돌님,
        </Text>
        <Text
            style={{
                position: 'absolute',
                top: 82,
                left: 16,
                fontSize: 17,
            }}
        >
            오늘도 안전하고{"\n"}
            행복한 하루 보내세요!
        </Text>

        <Image
            source={require('../../../assets/mascot.png')}
            style={{ 
                position: 'absolute',
                width: 227, 
                height: 227, 
                top: 42,
                left: 143,
            }}
        />

        <Text 
            className=" font-bold text-xl"
            style={{
                position: 'absolute',
                top: 177,
                left: 16,
                fontSize: 20,
            }}
        >
            현재 위치
        </Text>

        {/* 
            버튼 - 위치 데이터 새로고침하기
        */}

        <TouchableOpacity 
            className=" bg-component-color rounded-full justify-center items-center"
            style={{ 
                position: 'absolute',
                width: 30, 
                height: 30,
                top: 173,
                left: 98,
            }}
            onPress={getLocation}
        >
            <Image
                source={require('../../../assets/refresh.png')}
                style={{ width: 15, height: 15, tintColor: 'black' }}
            />
        </TouchableOpacity>

        {/* 
            텍스트 - 위치 데이터 새로고침 누르면 바뀌는 '시/구/동'
        */}
        <View>
            <Text 
                className= 'font-bold'
                style={{
                    position: 'absolute',
                    fontSize: 16,
                    top: 206,
                    left: 17,
                }}
            >
                {city}
            </Text>

            <Text 
                className= 'font-bold'
                style={{
                    position: 'absolute',
                    fontSize: 24,
                    top: 225,
                    left: 17,
                }}
            >
                {dongGu}
            </Text>
        </View>

        {/* 
            버튼 - 가까운 병원 확인하기
        */}
        <TouchableOpacity
            className="bg-component-color justify-center"
            style={{ 
                position: 'absolute',
                width: 315, 
                height: 52, 
                borderRadius: 10,
                top: 283,
                left: 17,
            }}
        >
            <View className="flex-row items-center justify-center">
                <Image
                source={require('../../../assets/mascot_icon.png')}
                style={{ width: 35, height: 35, marginRight: 8 }}
                />
                <Text className="text-white text-base font-bold">
                가까운 병원 확인하기
                </Text>
            </View>
        </TouchableOpacity>
    </View>
  );
}