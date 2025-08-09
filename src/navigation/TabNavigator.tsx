import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// 아이콘
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Foundation from '@expo/vector-icons/Foundation';

// 네비게이션을 위한 import
import LocationPage from '~/screens/Location/LocationPage';
import PharmacyPage from '~/screens/Pharmacy/PharmacyPage';
import HomePage from '~/screens/Home/HomePage';
import EmergencyPage from '~/screens/Emergency/EmergencyPage';
import MyPage from '~/screens/Mypage/MyPage';

const Tab = createBottomTabNavigator();


export default function TabNavigator() {
  
  return (
    <Tab.Navigator
    initialRouteName="HomePage"

    screenOptions={({ route }) => ({
    headerShown: false,
    tabBarLabelStyle: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    tabBarActiveTintColor: '#007aff', // 파란색
    tabBarInactiveTintColor: 'black', // 회색 대신 검정
    tabBarStyle: {
      height: 80,
      paddingBottom: 10,
      paddingTop: 5,
    },
    tabBarItemStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBarIcon: ({ color, size }) => {
  size = 30;

  const iconMap = {
    HomePage: <Foundation name="home" size={size} color={color} />,
    Pharmacy: <MaterialIcons name="local-hospital" size={size} color={color} />,
    Emergency: <MaterialCommunityIcons name="alarm-light" size={size} color={color} />,
    Location: <Ionicons name="location-sharp" size={size} color={color} />,
    MyPage: <Ionicons name="person-sharp" size={size} color={color} />,
  };

  return iconMap[route.name as keyof typeof iconMap] || null;
},
  })}
>
{/* Tab.Navigator 시작 태그 종료 지점 */}


      <Tab.Screen
        name="Location"
        component={LocationPage}
        options={{
          tabBarLabel: '위치',
        }}
      />
      <Tab.Screen
        name="Pharmacy"
        component={PharmacyPage}
        options={{
          tabBarLabel: '약국',
        }}
      />
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyPage}
        options={{
          tabBarLabel: '응급',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: 'MY',
        }}
      />
      
    </Tab.Navigator>
  );
}
