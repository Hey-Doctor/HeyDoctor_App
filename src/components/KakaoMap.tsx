// KakaoMap.tsx
import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { KAKAO_MAP_JS_KEY } from '@env';

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
  
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_JS_KEY}&libraries=services"></script>
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            height: 100vh; 
            width: 100vw;
            overflow: hidden;
          }
          html { 
            height: 100%; 
            width: 100%;
          }
          #map { 
            width: 100%; 
            height: 100%; 
            min-height: 200px;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          function initializeMap() {
            try {
              console.log('Initializing map...');
              
              if (typeof kakao === 'undefined') {
                console.error('Kakao is not defined');
                window.ReactNativeWebView?.postMessage('MAP_ERROR: Kakao not loaded');
                return;
              }

              if (!kakao.maps) {
                console.error('Kakao maps is not available');
                window.ReactNativeWebView?.postMessage('MAP_ERROR: Kakao maps not available');
                return;
              }

              const mapContainer = document.getElementById('map');
              if (!mapContainer) {
                console.error('Map container not found');
                window.ReactNativeWebView?.postMessage('MAP_ERROR: Container not found');
                return;
              }

              const mapOption = {
                center: new kakao.maps.LatLng(${latitude}, ${longitude}),
                level: 3
              };

              console.log('Creating map with options:', mapOption);
              
              const map = new kakao.maps.Map(mapContainer, mapOption);
              
              const markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
              const marker = new kakao.maps.Marker({
                position: markerPosition
              });
              
              marker.setMap(map);

              console.log('Map initialized successfully');
              window.ReactNativeWebView?.postMessage('MAP_LOADED');
              
            } catch (error) {
              console.error('Map initialization error:', error);
              window.ReactNativeWebView?.postMessage('MAP_ERROR: ' + error.message);
            }
          }

          // 여러 방법으로 초기화 시도
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeMap);
          } else {
            // DOM이 이미 로드된 경우
            if (typeof kakao !== 'undefined') {
              initializeMap();
            } else {
              // Kakao 스크립트 로딩 대기
              let attempts = 0;
              const maxAttempts = 50;
              const checkKakao = setInterval(() => {
                attempts++;
                if (typeof kakao !== 'undefined' && kakao.maps) {
                  clearInterval(checkKakao);
                  initializeMap();
                } else if (attempts >= maxAttempts) {
                  clearInterval(checkKakao);
                  console.error('Kakao maps failed to load after maximum attempts');
                  window.ReactNativeWebView?.postMessage('MAP_ERROR: Timeout loading Kakao');
                }
              }, 100);
            }
          }

          // 윈도우 로드 이벤트도 추가
          window.addEventListener('load', function() {
            setTimeout(() => {
              if (typeof kakao !== 'undefined' && kakao.maps) {
                initializeMap();
              }
            }, 500);
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View className={className}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        className={webViewClassName || 'flex-1'}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={false}
        scrollEnabled={false}
        onLoad={() => {
          console.log('WebView loaded successfully');
        }}
        onError={(e) => {
          console.error('WebView error: ', e.nativeEvent);
        }}
        onMessage={(event) => {
          const message = event.nativeEvent.data;
          console.log('WebView message:', message);
          
          if (message === 'MAP_LOADED') {
            console.log('지도 로딩 완료!');
            onMapLoaded?.();
          } else if (message.startsWith('MAP_ERROR:')) {
            console.error('Map error:', message);
          } else {
            console.log('Other message:', message);
          }
        }}
        onLoadStart={() => console.log('WebView load started')}
        onLoadEnd={() => console.log('WebView load ended')}
      />
    </View>
  );
}