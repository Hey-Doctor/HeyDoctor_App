import { TouchableOpacity, Text, Image } from 'react-native';

export default function Login_Kakao() {
  const handleLogin = () => { /* 카카오 로그인 로직 */ };

  return (
    <TouchableOpacity 
        onPress={handleLogin}
        className="bg-yellow-400 w-[271px] h-[39px] rounded-[5px] justify-center"
    >
        <Image
            source={require('../../../assets/kakao.png')}
            className="absolute left-4 w-[17px] h-[15px]"
            />
        <Text
            className="text-center text-[14px] font-bold">
                카카오로 시작하기
        </Text>
    </TouchableOpacity>
  );
}