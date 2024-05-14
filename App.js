import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text, PermissionsAndroid, Button, Image  } from 'react-native';
import ChromeCast from './src/components/ChromeCast';
import ViewShot from "react-native-view-shot";
import { useRemoteMediaClient } from 'react-native-google-cast';
import * as server from "expo-http-server";

export default function App() {
  const client = useRemoteMediaClient();

  const loadReceiverUrl = async (uri) => {
    try {
      if (client) {
        await client.loadMedia({
          mediaInfo: {
            contentUrl: uri,
            contentType: 'image/*'
          },
        });
      }
    } catch (error) {
      console.error('Error loading custom receiver URL:', error);
    }
  };

  function ExampleWaitingCapture() {
    const ref = useRef();
  
    const onImageLoad = useCallback(() => {
      ref.current.capture().then(uri => {
        console.log("do something with ", uri);
        if (client) {
          loadReceiverUrl(uri)
        }
      })
    }, []);
  
    return (
      <ViewShot ref={ref}>
        <ChromeCast/>
        <Text>...Something to rasterize...</Text>
        <Image onLoad={onImageLoad}/>
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
