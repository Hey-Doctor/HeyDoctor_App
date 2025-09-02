import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmergencyPatient from './EmergencyPatient';
import EmergencyHospital from './EmergencyHospital';
import EmergencyInfo from './EmergencyInfo';
import EmergencyShelter from './EmergencyShelter';
import Header from './components/Header';

export default function EmergencyPage() {
    return(
        <View>
            <Header/>
            <View className="flex-row flex-wrap justify-center top-[4px] gap-4">
                <EmergencyPatient />
                <EmergencyHospital />
                <EmergencyInfo />
                <EmergencyShelter />
            </View>
        </View>
    );
}