import { View , Text, Image} from "react-native";

export default function SafetyAlertMessage() {
    return (
        <View className='w-full p-[10px] gap-3 elevation-md bg-[#F1FAF1] rounded-2xl'>
        {/* 안전 문자 내용 버튼이랑 텍스트 = 제목 */}
            <View className='flex flex-row items-center gap-3'>
                <Image source={require('~/assets/screens/LocationPageAssets/informButton.png')} />
                <Text className='text-xl font-semibold'>안전 문자 내용</Text>
            </View>    
            <Text>Json으로 받아서 뿌리면 될듯</Text>
        </View>
    );
}