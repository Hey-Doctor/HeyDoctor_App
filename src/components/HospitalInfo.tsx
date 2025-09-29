import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapMarker } from '~/components/NativeMap'; // MapMarker 타입 import

interface HospitalInfoProps {
  data: MapMarker | null;
}

export default function HospitalInfo({ data }: HospitalInfoProps) {
  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.address}>{data.address}</Text>
      <Text style={styles.tel}>{data.tel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  tel: {
    fontSize: 14,
    color: '#666',
  },
});