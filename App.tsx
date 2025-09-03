import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "./global.css"
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from "~/navigation/TabNavigator";

import LocationPage from '~/screens/Location/LocationPage';
import PharmacyPage from '~/screens/Pharmacy/PharmacyPage';
import HomePage from '~/screens/Home/Home';
import EmergencyPage from '~/screens/Emergency/EmergencyPage';
import MyPage from '~/screens/Mypage/MyPage';
import AiquestionPage from '~/screens/AIQuestion/AIQuestionPage';

export type RootStackParamList = {
  MainTabs: undefined;
  Location: undefined;
  Pharmacy: undefined;
  HomePage: undefined;
  Emergency: undefined;
  MyPage: undefined;
  AiquestionPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Location"
            component={LocationPage}
            options={{ title: '위치' }}
          />
          <Stack.Screen
            name="Pharmacy"
            component={PharmacyPage}
            options={{ title: '약국' }}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ title: '홈' }}
          />
          <Stack.Screen
            name="Emergency"
            component={EmergencyPage}
            options={{ title: '응급' }}
          />
          <Stack.Screen
            name="MyPage"
            component={MyPage}
            options={{ title: 'MY' }}
          />
          <Stack.Screen
            name="AiquestionPage"
            component={AiquestionPage}
            options={{ title: 'AI 질문' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;