import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LocationPage from '~/screens/LocationPage';
import PharmacyPage from '~/screens/PharmacyPage';
import HomePage from '~/screens/HomePage';
import EmergencyPage from '~/screens/EmergencyPage';
import MyPage from '~/screens/MyPage';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: () => null,
      }}>
      <Tab.Screen
        name="Location"
        component={LocationPage}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Pharmacy"
        component={PharmacyPage}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={HomePage}
        options={{
          tabBarLabel: 'MyPage',
        }}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyPage}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Capsule"
        component={MyPage}
        options={{
          tabBarLabel: 'Capsule',
        }}
      />
      
    </Tab.Navigator>
  );
}
