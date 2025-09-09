import * as Location from 'expo-location';
import { Alert } from 'react-native';

// 반환 타입 정의
export type LocationType = {
  latitude: number;
  longitude: number;
} | null;

export default async function getLocationPermission(): Promise<LocationType> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('위치 권한이 필요합니다');
    return null;
  }

  const loc = await Location.getCurrentPositionAsync({
    accuracy: 5,
  });
  return {
    latitude: loc.coords.latitude,
    longitude: loc.coords.longitude,
  };
}
