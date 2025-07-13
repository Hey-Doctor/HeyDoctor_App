import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';

export default function Home_Sub() {
  return (
    <View
        className=" bg-default-color"
        style={{ 
            width: 351, 
            height: 161, 
            borderRadius: 20,
            position: 'relative',
        }}
    >

        {/* 
            카테고리 - 심장 충격기
        */}

        <TouchableOpacity
            className=' bg-white justify-center'
            style={{ 
                position: 'absolute',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                width: 113, 
                height: 43, 
                borderRadius: 20,
                top: 18,
                left: 15,

                // 수평 정렬 설정
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6, // 이미지와 텍스트 사이 간격
            }}
        >
            <Image
                source={require('../../../assets/heart.png')}
                style={{ 
                    width: 20, 
                    height: 20 
                }}
            />

            <Text
                className=' font-bold'
                style={{
                    fontSize: 13,
                }}
            >
                심장 충격기
            </Text>
        </TouchableOpacity>

        {/* 
            카테고리 - 약국
        */}
            
        <TouchableOpacity
            className=' bg-white justify-center'
            style={{ 
                position: 'absolute',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                width: 84, 
                height: 43, 
                borderRadius: 20,
                top: 18,
                left: 142,

                // 수평 정렬 설정
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6, // 이미지와 텍스트 사이 간격
            }}
        >
            <Image
                source={require('../../../assets/medicine.png')}
                style={{ 
                    width: 20, 
                    height: 20 
                }}
            />

            <Text
                className=' font-bold'
                style={{
                    fontSize: 13,
                }}
            >
                약국
            </Text>
        </TouchableOpacity>

        {/* 
            카테고리 - 대피소
        */}
            
        <TouchableOpacity
            className=' bg-white justify-center'
            style={{ 
                position: 'absolute',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                width: 90, 
                height: 43, 
                borderRadius: 20,
                top: 18,
                left: 241,

                // 수평 정렬 설정
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6, // 이미지와 텍스트 사이 간격
            }}
        >
            <Image
                source={require('../../../assets/shelter.png')}
                style={{ 
                    width: 20, 
                    height: 20 
                }}
            />

            <Text
                className=' font-bold'
                style={{
                    fontSize: 13,
                }}
            >
                대피소
            </Text>
        </TouchableOpacity>

        {/* 
            버튼 - 가까운 위치 확인하기 
        */}
        <TouchableOpacity
            className="bg-component-color justify-center"
            style={{ 
                position: 'absolute',
                width: 315, 
                height: 52, 
                borderRadius: 10,
                top: 85,
                left: 15,
            }}
        >
            <View className="flex-row items-center justify-center">
                <Image
                source={require('../../../assets/mascot_icon.png')}
                style={{ width: 35, height: 35, marginRight: 8 }}
                />
                <Text className="text-white text-base font-bold">
                가까운 위치 확인하기
                </Text>
            </View>
        </TouchableOpacity>
    </View>
  );
}