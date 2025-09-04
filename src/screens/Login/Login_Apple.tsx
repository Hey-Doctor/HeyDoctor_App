import { TouchableOpacity, Text, Image } from 'react-native';

export default function Login_Apple() {
  const handleLogin = () => { /* 애플 로그인 로직 */ };

  return (
    <TouchableOpacity 
        onPress={handleLogin}
        className="bg-black w-[271px] h-[39px] rounded-[5px] justify-center"
    >
        <Image
            source={require('../../assets/apple.png')}
            className="absolute left-4 w-[16px] h-[20px]"
            />
        <Text
            className="text-center text-white text-[14px] font-bold">
                애플로 시작하기
        </Text>
    </TouchableOpacity>
  );
}