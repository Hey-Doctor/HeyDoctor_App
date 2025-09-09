// KakaoMap.tsx
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { KAKAO_MAP_JS_KEY } from '@env';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

type KakaoMapProps = {
  latitude: number;
  longitude: number;
  className?: string;
  webViewClassName?: string;
  onMapLoaded?: () => void;
};

export default function KakaoMap({
  latitude, 
  longitude,
  className,
  webViewClassName,
  onMapLoaded,
}: KakaoMapProps) {
  const [markerImages, setMarkerImages] = useState<{ [key: string]: string }>({});

  // 옵저버 위치 변수 (초기값)
  let observeCoords = { observingLatitude: latitude, observingLongitude: longitude };

  useEffect(() => {
    (async () => {
      const images: { [key: string]: number } = {
        MyLocationMarker: require('~/assets/screens/LocationPageAssets/MyLocationMarker01.png'),
      };

      const result: { [key: string]: string } = {};

      for (const key in images) {
        const asset = Asset.fromModule(images[key]);
        await asset.downloadAsync();
        const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
          encoding: FileSystem.EncodingType.Base64,
        });
        result[key] = `data:image/png;base64,${base64}`;
      }

      setMarkerImages(result); // markerImages 상태 업데이트
    })();
  }, []);

  return (
    <View className={className}>
      {/* markerImages가 준비될 때만 WebView 렌더링 (수정) */}
      {Object.keys(markerImages).length > 0 && (
        <WebView
          originWhitelist={['*']}
          source={{
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_JS_KEY}&libraries=services"></script>
                  <style>
                    body { margin: 0; padding: 0; height: 100vh; width: 100vw; overflow: hidden; }
                    html { height: 100%; width: 100%; }
                    #map { width: 100%; height: 100%; min-height: 200px; }
                  </style>
                </head>
                <body>
                  <div id="map"></div>
                  <script>
                    function initializeMap() {
                      try {
                        const mapContainer = document.getElementById('map');
                        const mapOption = {
                          center: new kakao.maps.LatLng(${observeCoords.observingLatitude}, ${observeCoords.observingLongitude}),
                          level: 5
                        };
                        const map = new kakao.maps.Map(mapContainer, mapOption);

                        const markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
                        const imageSize = new kakao.maps.Size(20, 20);
                        const imageOption = { offset: new kakao.maps.Point(10, 20)};
                        
                        // React state에서 가져온 Base64 이미지를 직접 사용 (수정)
                        const markerImage = new kakao.maps.MarkerImage("${markerImages['MyLocationMarker']}", imageSize, imageOption);

                        const marker = new kakao.maps.Marker({
                          position: markerPosition,
                          image: markerImage
                        });
                        marker.setMap(map);

                        window.ReactNativeWebView?.postMessage('MAP_LOADED');
                      } catch (error) {
                        window.ReactNativeWebView?.postMessage('MAP_ERROR: ' + error.message);
                      }
                    }

                    if (document.readyState === 'loading') {
                      document.addEventListener('DOMContentLoaded', initializeMap);
                    } else {
                      initializeMap();
                    }
                  </script>
                </body>
              </html>
            `,
          }}
          className={webViewClassName || 'flex-1'}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={false}
          scrollEnabled={false}
          onLoad={() => {}}
          onError={(e) => {}}
          onMessage={(event) => {
            const message = event.nativeEvent.data;
            if (message === 'MAP_LOADED') {
              onMapLoaded?.();
            }
          }}
        />
      )}
    </View>
  );
}
