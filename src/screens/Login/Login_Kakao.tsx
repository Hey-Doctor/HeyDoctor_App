import { TouchableOpacity, Text, Image, Linking } from 'react-native';
export default function Login_Kakao() {
  const handleLogin = async () => { 
    console.log("카카오 클릭!!");
    const authUrl = 'http://localhost:8080/oauth2/authorization/kakao';
    await Linking.openURL(authUrl);
  };

  return (
    <TouchableOpacity 
        onPress={handleLogin}
        className="bg-yellow-400 w-[271px] h-[39px] rounded-[5px] justify-center"
    >
        <Image
            source={require('../../assets/kakao.png')}
            className="absolute left-4 w-[17px] h-[15px]"
            />
        <Text
            className="text-center text-[14px] font-bold">
                카카오로 시작하기
        </Text>
    </TouchableOpacity>
  );
}