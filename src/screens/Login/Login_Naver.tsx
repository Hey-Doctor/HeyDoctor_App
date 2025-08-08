import { TouchableOpacity, Text, Image } from 'react-native';

export default function Login_Naver() {
  const handleLogin = () => { /* 네이버 로그인 로직 */ };

  return (
    <TouchableOpacity 
        onPress={handleLogin}
        className="bg-green-500 w-[271px] h-[39px] rounded-[5px] justify-center"
    >
        <Image
            source={require('../../../assets/naver.png')}
            className="absolute left-4 w-[11px] h-[12px]"
            />
        <Text
            className="text-center text-[14px] font-bold">
                네이버로 시작하기
        </Text>
    </TouchableOpacity>
  );
}