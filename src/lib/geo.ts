// lib/geo.ts
export function haversineMeters(a: {lat:number; lng:number}, b:{lat:number; lng:number}) {
  const toRad = (d:number) => (d * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const la1 = toRad(a.lat), la2 = toRad(b.lat);
  const h = Math.sin(dLat/2)**2 + Math.cos(la1)*Math.cos(la2)*Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// 공공 API 응답을 지도 마커로 변환 (필드명은 실제 응답에 맞춰 수정)
export type MapMarker = {
  id: string;
  title: string;
  coordinate: { latitude:number; longitude:number };
  address?: string; tel?: string;
};

export function toHospitalMarkers(rows: any[]): MapMarker[] {
  return rows.map((x:any) => ({
    id: String(x.id ?? x.hpid ?? `${x.wgs84Lat},${x.wgs84Lon}`),
    title: x.name ?? x.dutyName ?? '병원',
    coordinate: {
      latitude: Number(x.lat ?? x.wgs84Lat),
      longitude: Number(x.lng ?? x.wgs84Lon),
    },
    address: x.addr ?? x.dutyAddr,
    tel: x.tel ?? x.dutyTel1,
  })).filter(m => Number.isFinite(m.coordinate.latitude) && Number.isFinite(m.coordinate.longitude));
}