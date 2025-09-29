// screens/Location/LocationPage.tsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Pressable, InteractionManager, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Region } from 'react-native-maps';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { subscribeRibbonHeight, getRibbonHeight } from '~/utils/ribbonHeight';
import NativeMap, { NativeMapHandle, MapMarker } from '~/components/NativeMap';
import * as Location from 'expo-location';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import DisasterAlert from '~/components/DisasterAlert';
import WeatherInfo from '~/components/WeatherInfo';
import HospitalInfo from '~/components/HospitalInfo';

/** ───────── 유틸 ───────── **/
function debounce<T extends (...args:any)=>any>(fn:T, ms:number) {
  let t:any; return (...args:Parameters<T>) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
async function fetchHospitalsNearMock(lat:number, lng:number, radiusMeters:number) {
  await new Promise(res => setTimeout(res, 200));
  const list: MapMarker[] = Array.from({length: 8}).map((_, i) => ({
    id: `mock-${i}`,
    title: `가상 병원 ${i + 1}`,
    coordinate: { latitude: lat + (Math.random()-0.5)*0.01, longitude: lng + (Math.random()-0.5)*0.01 },
    address: '서울 어딘가',
    tel: '02-123-4567',
  }));
  return list;
}
const haversine = (a:{lat:number; lng:number}, b:{lat:number; lng:number}) => {
  const R=6371000, dLat=(b.lat-a.lat)*Math.PI/180, dLon=(b.lng-a.lng)*Math.PI/180;
  const s1=Math.sin(dLat/2)**2, s2=Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(s1+s2));
};

export default function PharmacyPage() {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const tabBarHeight = useBottomTabBarHeight();
  const [ribbonHeight, setRibbonHeight] = useState(getRibbonHeight());

  // 리본 높이 구독
  useEffect(() => {
    const unsub = subscribeRibbonHeight((h) => setRibbonHeight(h));
    return unsub;
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [mapMounted, setMapMounted] = useState(false);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [center, setCenter] = useState({ latitude: 37.5665, longitude: 126.9780 });
  const mapRef = useRef<NativeMapHandle>(null);

  // BottomSheet
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['18%', '46%'], []);
  const presentedRef = useRef(false); // 중복 present 방지

  // 이동 루프 방지
  const ignoreNextRef = useRef(false);
  const lastRegionRef = useRef<Region | null>(null);
  const lastFetchedRef = useRef<{lat:number; lng:number; zoom:number} | null>(null);
  
  // 마커 클릭 상태를 추적하기 위한 ref
  const isMarkerPressedRef = useRef(false);

  const safeFitToMarkers = () => { ignoreNextRef.current = true; mapRef.current?.fitToMarkers(); };

  // 마커 클릭 시 병원 정보를 저장할 상태
  const [selectedHospital, setSelectedHospital] = useState<MapMarker | null>(null);

  // 마커 클릭 시 병원 정보를 저장
  const handleMarkerPress = (marker: MapMarker) => {
    isMarkerPressedRef.current = true; // 마커가 클릭되었음을 표시
    setSelectedHospital(marker);
    sheetRef.current?.snapToIndex(1);
  };
  
  // 지도 빈 공간 클릭 시 병원 정보 초기화
  const handleMapPress = () => {
    if (isMarkerPressedRef.current) { // 마커 클릭 직후라면 무시
      isMarkerPressedRef.current = false;
      return;
    }
    setSelectedHospital(null);
  };

  // 날씨
  const [weatherData, setWeatherData] = useState(null);

  // 재난문자
  const [safetyAlertData, setSafetyAlertData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const url = `http://172.20.10.2:8080/api/weather?lat=${center.latitude}&lon=${center.longitude}`;
        const response = await fetch(url);
        const json = await response.json();
        setWeatherData(json);
      } catch (error) {
        console.log("날씨 데이터 오류");
      }
    };

    // 안전 문자 데이터 가져오기
    const fetchSafetyAlertData = async () => {
      try {
        const url = `http://172.20.10.2:8080/api/disaster-alert?lat=${center.latitude}&lon=${center.longitude}`;
        const response = await fetch(url);
        const json = await response.json();
        setSafetyAlertData(json);
      } catch (error) {
        console.error("안전 문자 데이터 로딩 실패:", error);
      }
    };
      
    // 위치 정보를 가져왔을 때만 데이터 요청
    if (!isLoading && center.latitude && center.longitude) {
      fetchWeatherData();
      fetchSafetyAlertData();
    }
  }, [isLoading, center]); // isLoading 또는 center가 변경될 때마다 실행

  // 현재 위치
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const cur = await Location.getCurrentPositionAsync({});
          setCenter({ latitude: cur.coords.latitude, longitude: cur.coords.longitude });
        }
      } catch {}
      setIsLoading(false);
    })();
  }, []);

  // 초기 마커
  const handleMapLoaded = useCallback(async () => {
    try {
      const data = await fetchHospitalsNearMock(center.latitude, center.longitude, 1200);
      setMarkers(data);
      setTimeout(() => safeFitToMarkers(), 80);
    } catch (e) { console.warn(e); }
    setMapMounted(true); // ✅ 지도 준비 완료
  }, [center.latitude, center.longitude]);

  // 디바운스 조회
  const debouncedFetch = useMemo(
    () => debounce(async (region: Region) => {
      const prev = lastFetchedRef.current;
      const zoom = region.latitudeDelta;
      const lat = region.latitude, lng = region.longitude;

      if (prev) {
        const moved = haversine({ lat: prev.lat, lng: prev.lng }, { lat, lng });
        const zoomDiff = Math.abs(prev.lat - region.latitudeDelta);
        if (moved < 50 && zoomDiff < 0.002) {
          return;
        }
      }
      if (region.latitudeDelta > 0.5 || region.longitudeDelta > 0.5) {
        return;
      }

      const approxKm = Math.max(0.2, region.latitudeDelta * 111 / 2);
      const data = await fetchHospitalsNearMock(lat, lng, Math.round(approxKm * 1000));
      setMarkers(data);
      lastFetchedRef.current = { lat, lng, zoom };
    }, 350),
    []
  );

  const handleRegionChangeDone = (region: Region, details?: { isGesture?: boolean }) => {
    if (ignoreNextRef.current) {
      ignoreNextRef.current = false;
      lastRegionRef.current = region;
      return;
    }
    if (details?.isGesture === false) {
      lastRegionRef.current = region;
      return;
    }
    const prev = lastRegionRef.current;
    if (prev) {
      const moved = haversine({ lat: prev.latitude, lng: prev.longitude }, { lat: region.latitude, lng: region.longitude });
      const zoomDiff = Math.abs(prev.latitudeDelta - region.latitudeDelta);
      if (moved < 50 && zoomDiff < 0.002) {
        lastRegionRef.current = region;
        return;
      }
    }
    lastRegionRef.current = region;
    debouncedFetch(region);
  };

  // ✅ 준비 상태가 되었을 때만 1회 present
  const ready = !isLoading && mapMounted;

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    if (!ready) {
      return;
    }
    if (presentedRef.current) {
      return;
    }
    const task = InteractionManager.runAfterInteractions(() => {
      requestAnimationFrame(() => {
        sheetRef.current?.present();
        presentedRef.current = true;
      });
    });

    return () => {
      task.cancel();
    };
  }, [isFocused, ready]);

  // 화면 이탈 시 정리 및 다음 진입에서 다시 열릴 수 있게 플래그 리셋
  useFocusEffect(
    useCallback(() => {
      return () => {
        sheetRef.current?.dismiss();
        presentedRef.current = false;
      };
    }, [])
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>현재 위치를 가져오는 중...</Text>
      </SafeAreaView>
    );
  }

  const sampleAlert = {
    title: '국가재난문자',
    region: '서울특별시',
    time: '2025-09-14 20:10',
    body: '현재 강풍주의보가 발령되었습니다. 외출 시 주의하시고, 간판 등 낙하물에 유의하세요.',
  };

  const bottomInset = tabBarHeight + ribbonHeight;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View style={{ flex: 1 }}>
        <NativeMap
          ref={mapRef}
          latitude={center.latitude}
          longitude={center.longitude}
          markers={markers}
          onMapLoaded={handleMapLoaded}
          onRegionChangeDone={handleRegionChangeDone}
          onMarkerPress={handleMarkerPress}
          onPress={handleMapPress}
          className="flex-1"
        />
      </View>

      {ready && (
        <BottomSheetModal
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          bottomInset={tabBarHeight + ribbonHeight}
          backgroundStyle={{
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor: 'white',
          }}
          handleIndicatorStyle={{ width: 44, height: 6, borderRadius: 4 }}
          onChange={(i) => console.log('sheet index:', i)}
        >
          <BottomSheetView className="flex flex-col p-4 gap-8">
            {/* 안전 문자 섹션 */}
            <View className='w-full p-[10px] gap-3 elevation-md bg-[#F1FAF1] rounded-2xl'>
                <View className='flex flex-row items-center gap-3'>
                    <Image source={require('~/assets/screens/LocationPageAssets/informButton.png')} />
                    <Text className='text-xl font-semibold'>안전 문자</Text>
                </View>    
                {safetyAlertData ? <DisasterAlert data={safetyAlertData}/> : <ActivityIndicator size="small" />}
            </View> 

            {/* 날씨/병원 정보 섹션 */}
            <View className="w-full p-[10px] gap-3 elevation-md bg-[#E6EEFF] rounded-2xl">
              <View className="flex flex-row items-center gap-3">
                <Text className="text-xl font-semibold">
                  {selectedHospital ? '선택된 병원 정보' : '현재 날씨'}
                </Text>
              </View>
              {selectedHospital ? (
                <HospitalInfo data={selectedHospital} />
              ) : (
                weatherData ? <WeatherInfo data={weatherData} /> : <ActivityIndicator size="small" />
              )}
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      )}
    </SafeAreaView>
  );
}