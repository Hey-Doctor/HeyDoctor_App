import "./global.css"
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "~/navigation/TabNavigator";
import { AuthProvider } from 'src/auth/AuthContext';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;