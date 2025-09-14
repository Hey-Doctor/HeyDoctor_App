// pages/LocationPage.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Region } from 'react-native-maps';
import NativeMap, { NativeMapHandle, MapMarker } from '~/components/NativeMap';
import { haversineMeters } from '~/lib/geo';
import * as Location from 'expo-location';

/** ───────── 유틸 ───────── **/
function debounce<T extends (...args:any)=>any>(fn:T, ms:number) {
  let t:any;
  return (...args:Parameters<T>) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

/** 목데이터 생성 (현재 중심 근처 무작위 마커) */
function metersToDegrees(lat: number, meters: number) {
  const latDeg = meters / 111_000;
  const lonDeg = meters / (111_000 * Math.cos((lat * Math.PI) / 180));
  return { latDeg, lonDeg };
}
async function fetchHospitalsNearMock(lat:number, lng:number, radiusMeters:number) {
  await new Promise(res => setTimeout(res, 200)); // network delay 흉내
  const count = 25;
  const list: MapMarker[] = [];
  for (let i = 0; i < count; i++) {
    const r = Math.sqrt(Math.random()) * radiusMeters;
    const theta = Math.random() * Math.PI * 2;
    const dx = r * Math.cos(theta);
    const dy = r * Math.sin(theta);
    const { latDeg, lonDeg } = metersToDegrees(lat, 1);
    list.push({
      id: `mock-${i}`,
      title: `가상 병원 ${i + 1}`,
      coordinate: { latitude: lat + dy * latDeg, longitude: lng + dx * lonDeg },
      address: '서울 어딘가',
      tel: '02-123-4567',
    });
  }
  return list;
}

/** ───────── 페이지 ───────── **/
export default function PharmacyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [center, setCenter] = useState({ latitude: 37.5665, longitude: 126.9780 }); // fallback: 서울시청
  const mapRef = useRef<NativeMapHandle>(null);

  // 루프 차단용 ref들
  const ignoreNextRef = useRef(false);
  const lastRegionRef = useRef<Region | null>(null);
  const lastFetchedRef = useRef<{lat:number; lng:number; zoom:number} | null>(null);

  // 프로그램 이동 래퍼
  const safePanTo = (lat:number, lng:number, zoomDelta=0.02) => {
    ignoreNextRef.current = true;      // 다음 onRegionChangeComplete 무시
    mapRef.current?.panTo(lat, lng, zoomDelta);
  };
  const safeFitToMarkers = () => {
    ignoreNextRef.current = true;      // 다음 onRegionChangeComplete 무시
    mapRef.current?.fitToMarkers();
  };

  // 현재 위치 확보(실패해도 fallback으로 진행)
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

  // 지도 로딩 완료 → 초기 데이터 조회 + 화면 맞춤
  const handleMapLoaded = async () => {
    try {
      const data = await fetchHospitalsNearMock(center.latitude, center.longitude, 2000);
      setMarkers(data);
      setTimeout(() => safeFitToMarkers(), 50);
    } catch (e) {
      console.warn(e);
    }
  };

  // 디바운스된 조회
  const debouncedFetch = useMemo(
    () => debounce(async (region: Region) => {
      // 의미있는 이동/줌만 조회: 이전 fetch 지점과 비교
      const prev = lastFetchedRef.current;
      const zoom = region.latitudeDelta; // 간이 줌 지표
      const lat = region.latitude, lng = region.longitude;

      if (prev) {
        // 중심 이동 150m 미만 & 줌 변화 미미하면 무시
        const moved = haversineMeters(
          { lat: prev.lat, lng: prev.lng },
          { lat, lng }
        );
        const zoomDiff = Math.abs(prev.zoom - zoom);
        if (moved < 150 && zoomDiff < 0.005) return;
      }

      // 줌에 따라 반경 가변
      if (region.latitudeDelta > 0.5 || region.longitudeDelta > 0.5) return; // 전국 단위 방지
      const approxKm = Math.max(0.2, region.latitudeDelta * 111 / 2);
      const radiusMeters = Math.round(approxKm * 1000);

      const data = await fetchHospitalsNearMock(lat, lng, radiusMeters);
      setMarkers(data);
      lastFetchedRef.current = { lat, lng, zoom };
    }, 350),
    []
  );

  // onRegionChangeComplete 핸들러: 루프 차단 + 제스처 필터 + 최소 변화 체크
  const handleRegionChangeDone = (region: Region, details?: { isGesture?: boolean }) => {
    // 프로그램 이동이면 딱 한 번만 무시
    if (ignoreNextRef.current) {
      ignoreNextRef.current = false;
      lastRegionRef.current = region;
      return;
    }
    // 사용자 제스처가 아닌 경우 스킵 (platform/버전에 따라 undefined일 수 있음)
    if (details?.isGesture === false) {
      lastRegionRef.current = region;
      return;
    }
    // 이전 region과 의미있는 변화가 없으면 무시(부동소수 흔들림 방지)
    const prev = lastRegionRef.current;
    if (prev) {
      const moved = haversineMeters(
        { lat: prev.latitude, lng: prev.longitude },
        { lat: region.latitude, lng: region.longitude }
      );
      const zoomDiff = Math.abs(prev.latitudeDelta - region.latitudeDelta);
      if (moved < 50 && zoomDiff < 0.002) {
        lastRegionRef.current = region;
        return;
      }
    }

    lastRegionRef.current = region;
    debouncedFetch(region);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>현재 위치를 가져오는 중...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View style={{ flex: 1 }}>
        <NativeMap
          ref={mapRef}
          latitude={center.latitude}
          longitude={center.longitude}
          markers={markers}
          onMapLoaded={handleMapLoaded}
          onRegionChangeDone={handleRegionChangeDone} // (region, details) 받음
          className="flex-1"
        />
      </View>
    </SafeAreaView>
  );
}