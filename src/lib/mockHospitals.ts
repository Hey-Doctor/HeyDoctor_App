// lib/mockHospitals.ts
import type { MapMarker } from '~/components/NativeMap';

function metersToDegrees(lat: number, meters: number) {
  const latDeg = meters / 111_000;
  const lonDeg = meters / (111_000 * Math.cos((lat * Math.PI) / 180));
  return { latDeg, lonDeg };
}

/** 중심(lat,lng) 기준 반경(radiusMeters) 안에 count개 무작위 병원 마커 생성 */
export function generateMockHospitals(
  centerLat: number,
  centerLng: number,
  count = 20,
  radiusMeters = 500
): MapMarker[] {
  const out: MapMarker[] = [];
  for (let i = 0; i < count; i++) {
    // 0~1 난수 → 반경 균등 분포를 위해 sqrt 사용
    const r = Math.sqrt(Math.random()) * radiusMeters;
    const theta = Math.random() * Math.PI * 2;

    const dx = r * Math.cos(theta);
    const dy = r * Math.sin(theta);

    const { latDeg, lonDeg } = metersToDegrees(centerLat, 1);
    const lat = centerLat + dy * latDeg;
    const lng = centerLng + dx * lonDeg;

    out.push({
      id: `mock-${i}`,
      title: `가상 병원 ${i + 1}`,
      coordinate: { latitude: lat, longitude: lng },
      address: '서울 어딘가',
      tel: '02-123-4567',
    });
  }
  return out;
}