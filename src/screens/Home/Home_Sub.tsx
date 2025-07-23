import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function Home_Sub() {
  return (
    <View className="bg-default-color w-[351px] h-[161px] rounded-[20px] relative">

      {/* 카테고리 - 심장 충격기 */}
      <TouchableOpacity
        className="absolute top-[18px] left-[15px] bg-white w-[113px] h-[43px] rounded-[20px] flex-row items-center justify-center gap-[6px]"
      >
        <Image
          source={require('../../../assets/heart.png')}
          className="w-[20px] h-[20px]"
        />
        <Text className="font-bold text-[13px]">심장 충격기</Text>
      </TouchableOpacity>

      {/* 카테고리 - 약국 */}
      <TouchableOpacity
        className="absolute top-[18px] left-[142px] bg-white w-[84px] h-[43px] rounded-[20px] flex-row items-center justify-center gap-[6px]"
      >
        <Image
          source={require('../../../assets/medicine.png')}
          className="w-[20px] h-[20px]"
        />
        <Text className="font-bold text-[13px]">약국</Text>
      </TouchableOpacity>

      {/* 카테고리 - 대피소 */}
      <TouchableOpacity
        className="absolute top-[18px] left-[241px] bg-white w-[90px] h-[43px] rounded-[20px] flex-row items-center justify-center gap-[6px]"
      >
        <Image
          source={require('../../../assets/shelter.png')}
          className="w-[20px] h-[20px]"
        />
        <Text className="font-bold text-[13px]">대피소</Text>
      </TouchableOpacity>

      {/* 버튼 - 가까운 위치 확인하기 */}
      <TouchableOpacity
        className="absolute top-[85px] left-[15px] bg-component-color w-[315px] h-[52px] rounded-[10px] justify-center"
      >
        <View className="flex-row items-center justify-center">
          <Image
            source={require('../../../assets/mascot_icon.png')}
            className="w-[35px] h-[35px] mr-[8px]"
          />
          <Text className="text-white text-base font-bold">
            가까운 위치 확인하기
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}