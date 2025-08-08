import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "./global.css"
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "~/navigation/TabNavigator";

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;