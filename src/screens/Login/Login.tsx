import { View } from 'react-native';
import Login_SocialSection from './Login_SocialSection';
import Login_ContentSection from './Login_ContentSection';

export default function Login() {
  return (
    <View>
      <Login_ContentSection/>
      <Login_SocialSection/>
    </View>
  );
}