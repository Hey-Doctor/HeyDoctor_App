import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Foundation from '@expo/vector-icons/Foundation';

export default function MyPage_Menu() {
  const iconSize = 25;
  const arrowSize = 30;

  const MenuItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <TouchableOpacity className="bg-white w-[327px] h-[65px] shadow-custom flex-row items-center justify-between px-3">
      {/* 왼쪽: 아이콘 + 텍스트 */}
      <View className="flex-row items-center">
        <View className="w-[30px] items-center">
          {icon}
        </View>
        <Text className="ml-2 font-bold text-[16px]">{text}</Text>
      </View>

      {/* 오른쪽: 화살표 */}
      <MaterialIcons name="chevron-right" size={arrowSize} />
    </TouchableOpacity>
  );

  return (
    <View className="gap-1">
      <MenuItem icon={<MaterialIcons name="search" size={iconSize} />} text="최근 검색 기록" />
      <MenuItem icon={<Foundation name="telephone" size={iconSize} color="green" />} text="고객센터" />
      <MenuItem icon={<MaterialCommunityIcons name="hospital-box" size={iconSize} color="#6995F8" />} text="증상별 진료과 찾기" />
      <MenuItem icon={<MaterialCommunityIcons name="account" size={iconSize} color="#E8C2DE" />} text="내 정보 관리" />
    </View>
  );
}