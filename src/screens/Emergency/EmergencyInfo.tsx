import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; 

export default function EmergencyInfo() {
    return(
        <>
            <View>
                <TouchableOpacity
                        className="bg-white w-[175px] h-[325px] rounded-[10px] shadow-custom items-center justify-center"
                >
                    <MaterialIcons name="chevron-right" size={50} className='absolute top-2 right-0'/>
                    <Image
                        source={require('../../../assets/info.png')}
                        className="w-[50px] h-[50px]"
                    />
                    <Text className='text-[20px] font-bold'>응급 처치 정보</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}