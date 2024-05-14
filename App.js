import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text, PermissionsAndroid, Button, Image  } from 'react-native';
import ChromeCast from './src/components/ChromeCast';
import ViewShot from "react-native-view-shot";

export default function App() {
  function ExampleWaitingCapture() {
    const ref = useRef();
  
    const onImageLoad = useCallback(() => {
      ref.current.capture().then(uri => {
        console.log("do something with ", uri);
      })
    }, []);
  
    return (
      <ViewShot ref={ref}>
        <Text>...Something to rasterize...</Text>
        <Image onLoad={onImageLoad} />
      </ViewShot>
    );
  }

  return (
    <View style={styles.container}>
      {/* <ChromeCast/> */}

      <ExampleWaitingCapture/>
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
