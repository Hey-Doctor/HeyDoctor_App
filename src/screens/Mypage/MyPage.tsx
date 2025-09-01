import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '~/auth/AuthContext';
import MyPage_Login from './MyPage_Login';
import MyPage_Logout from './MyPage_Logout';


export default function MyPage() {
    const { user } = useAuth();
    return(
        <View className="flex-1 bg-white p-4">
            {user ? <MyPage_Login /> : <MyPage_Logout />}
        </View>
    );
}