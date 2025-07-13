import { View } from 'react-native';
import Home_Main from './Home_Main';
import Home_Sub from './Home_Sub';

export default function Home() {
  return (
    <View 
      style={{ 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center' 
        }}
      >
      <Home_Main />
      <View style={{ height: 13 }} />
      <Home_Sub />
    </View>
  );
}