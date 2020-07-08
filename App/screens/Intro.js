import React from 'react';
import { View, Text } from 'react-native';

export const Intro = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Welcome!</Text>
  </View>
);
