import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyPage_Menu from './MyPage_Menu';


export default function MyPage() {
    return(
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <View>
                <MyPage_Menu/>
            </View>
        </SafeAreaView>
            
    );
}