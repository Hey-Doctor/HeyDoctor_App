import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DisasterAlertProps {
  data: {
    body: string;
  } | null;
}

export default function DisasterAlert({ data }: DisasterAlertProps) {
  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.body}>{data.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
  },
});