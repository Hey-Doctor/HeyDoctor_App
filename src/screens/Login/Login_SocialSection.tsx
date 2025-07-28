import { View } from 'react-native';
import Login_Kakao from './Login_Kakao';
import Login_Naver from './Login_Naver';
import Login_Apple from './Login_Apple';

export default function Login_SocialSection() {
    return (
        <View
            className="gap-y-[8px]"
        >
            <Login_Kakao/>
            <Login_Naver/>
            <Login_Apple/>
        </View>
    );
}