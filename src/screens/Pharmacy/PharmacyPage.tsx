// screens/Location/LocationPage.tsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Pressable, InteractionManager } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Region } from 'react-native-maps';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { subscribeRibbonHeight, getRibbonHeight } from '~/utils/ribbonHeight';
import NativeMap, { NativeMapHandle, MapMarker } from '~/components/NativeMap';
import * as Location from 'expo-location';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import SafetyAlertMessage from '../Location/Location_components/SafetyAlertMessage';
import WeatherInfo from '~/components/WeatherInfo';

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

  const safeFitToMarkers = () => { ignoreNextRef.current = true; mapRef.current?.fitToMarkers(); };

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 현재 위치 정보(center)를 활용하여 URL 생성
        const url = `http://192.168.219.144:8080/api/weather?lat=37.5665&lon=126.9780`;

        const response = await fetch(url);
        const json = await response.json();
        setWeatherData(json);
      } catch (error) {
      }
    };
    
    // 2. 위치 정보를 가져왔을 때만 데이터 요청
    if (!isLoading && center.latitude && center.longitude) {
      fetchData();
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
        const zoomDiff = Math.abs(prev.zoom - zoom);
        if (moved < 150 && zoomDiff < 0.005) return;
      }
      if (region.latitudeDelta > 0.5 || region.longitudeDelta > 0.5) return;

      const approxKm = Math.max(0.2, region.latitudeDelta * 111 / 2);
      const data = await fetchHospitalsNearMock(lat, lng, Math.round(approxKm * 1000));
      setMarkers(data);
      lastFetchedRef.current = { lat, lng, zoom };
    }, 350),
    []
  );

  const handleRegionChangeDone = (region: Region, details?: { isGesture?: boolean }) => {
    if (ignoreNextRef.current) { ignoreNextRef.current = false; lastRegionRef.current = region; return; }
    if (details?.isGesture === false) { lastRegionRef.current = region; return; }
    const prev = lastRegionRef.current;
    if (prev) {
      const moved = haversine({ lat: prev.latitude, lng: prev.longitude }, { lat: region.latitude, lng: region.longitude });
      const zoomDiff = Math.abs(prev.latitudeDelta - region.latitudeDelta);
      if (moved < 50 && zoomDiff < 0.002) { lastRegionRef.current = region; return; }
    }
    lastRegionRef.current = region;
    debouncedFetch(region);
  };

  // ✅ 준비 상태가 되었을 때만 1회 present
  // ribbonHeight > 0 조건 제거
  const ready = !isLoading && mapMounted;

  useEffect(() => {
    if (!isFocused) return;
    if (!ready) return;
    if (presentedRef.current) return;

    // 레이아웃/애니메이션 큐가 비고 나서 열기(플리커/레이스 방지)
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
          {/* 요청하신 바텀시트 콘텐츠 영역을 BottomSheetView 안에 추가합니다. */}
          <BottomSheetView className="flex flex-col p-4 gap-8">
            {/* 안전 문자 내용 칸 */}
            <SafetyAlertMessage />

            <View className="w-full p-[10px] gap-3 elevation-md bg-[#E6EEFF] rounded-2xl">
              {/* 안전 문자 내용 버튼이랑 텍스트 = 제목 */}
              <View className="w-full p-[10px] gap-3 elevation-md bg-[#E6EEFF] rounded-2xl">
                {/* weatherData가 있으면 WeatherInfo 컴포넌트 렌더링, 없으면 로딩 인디케이터 렌더링 */}
                {weatherData ? <WeatherInfo data={weatherData} /> : <ActivityIndicator size="small" />}
              </View>
            </View>

            <Text className="text-center text-gray-700">
              바텀시트 콘텐츠 영역 ddd
            </Text>
          </BottomSheetView>
        </BottomSheetModal>
      )}
    </SafeAreaView>
  );
}