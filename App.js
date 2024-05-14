import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text, PermissionsAndroid, Button  } from 'react-native';
import ChromeCast from './src/components/ChromeCast';


export default function App() {


  return (
    <View style={styles.container}>
      <ChromeCast/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
