// components/NativeMap.tsx
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { View } from 'react-native';
import MapView, { Marker, MapViewProps, Region } from 'react-native-maps';

export type LatLng = { latitude: number; longitude: number };

export type MapMarker = {
  id: string;
  title?: string;
  coordinate: LatLng;
  address?: string;
  tel?: string;
  // 필요시 icon 등 추가
};

type RegionChangeDetails = { isGesture?: boolean };

// onPress 이벤트 타입을 정의합니다.
type OnPressType = MapViewProps['onPress'];

type Props = {
  latitude: number;           // 초기 중심 lat
  longitude: number;          // 초기 중심 lng
  className?: string;
  onMapLoaded?: () => void;
  markers?: MapMarker[];      // 병원/약국 등 마커들
  onMarkerPress?: (m: MapMarker) => void;
  onRegionChangeDone?: (r: Region, details?: RegionChangeDetails) => void;
  onPress?: OnPressType; // ✅ onPress 속성 추가
};

export type NativeMapHandle = {
  panTo: (lat: number, lng: number, zoomDelta?: number) => void;
  fitToMarkers: () => void;
  getRegion: () => Promise<Region | null>;
};

const NativeMap = forwardRef<NativeMapHandle, Props>(function NativeMap(
  { latitude, longitude, className, onMapLoaded, markers = [], onMarkerPress, onRegionChangeDone, onPress }, // ✅ onPress 속성 추가
  ref
) {
  const mapRef = useRef<MapView>(null);

  useImperativeHandle(ref, () => ({
    panTo: (lat, lng, zoomDelta = 0.02) => {
      mapRef.current?.animateToRegion(
        { latitude: lat, longitude: lng, latitudeDelta: zoomDelta, longitudeDelta: zoomDelta },
        300
      );
    },
    fitToMarkers: () => {
      if (!markers.length) return;
      mapRef.current?.fitToCoordinates(
        markers.map(m => m.coordinate),
        { edgePadding: { top: 40, right: 40, bottom: 40, left: 40 }, animated: true }
      );
    },
    getRegion: async () => {
      // @ts-ignore: private API 회피용. 필요 없으면 제거
      return mapRef.current?._lastRegion ?? null;
    },
  }));

  const initialRegion: Region = useMemo(
    () => ({
      latitude,
      longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }),
    [latitude, longitude]
  );

  const handleRegionChangeComplete: MapViewProps['onRegionChangeComplete'] = (r, details) => {
    onRegionChangeDone?.(r, details);
  };

  // 최초 로딩 이벤트
  useEffect(() => {
    // react-native-maps엔 onMapLoaded가 있지만 기기별 편차가 있어 최초 mount 시점 콜백 처리
    const t = setTimeout(() => onMapLoaded?.(), 100);
    return () => clearTimeout(t);
  }, [onMapLoaded]);

  return (
    <View className={className ?? 'flex-1'}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        showsUserLocation
        onRegionChangeComplete={handleRegionChangeComplete}
        onPress={onPress} // ✅ onPress 속성 추가
      >
        {markers.map(m => (
          <Marker
            key={m.id}
            coordinate={m.coordinate}
            title={m.title}
            onPress={() => onMarkerPress?.(m)}
          />
        ))}
      </MapView>
    </View>
  );
});

export default NativeMap;