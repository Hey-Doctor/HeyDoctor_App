import { View, Text, Image } from 'react-native';

export default function Login_ContentSection() {
    return (
        <View
            className="my-[69px]"
        >
            <Image
                source={require('../../../assets/heyDoctor_mainLogo.png')}
                className="w-[276px] h-[276px]"
            />
            <Text
                className="text-center text-[20px] font-bold">
                간편 로그인으로{"\n"}더 다양한 서비스를{"\n"}이용하세요
            </Text>
            <View 
                className="flex-row items-center justify-center space-x-5 my-[16px]">
                <Image
                source={require('../../../assets/login_lightning.png')}
                className="w-[12px] h-[22px]"
                />
                <Text
                className="text-neutral-600 text-[10px] font-bold">
                    3초 만에 빠른 회원가입
                </Text>
            </View>
      </View>
    );
}