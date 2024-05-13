import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { CastButton, useRemoteMediaClient } from 'react-native-google-cast';
import { FFmpegKit, FFmpegKitConfig, ReturnCode } from 'ffmpeg-kit-react-native';
import * as FileSystem from 'expo-file-system';
import * as Network from 'expo-network';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const client = useRemoteMediaClient();
  
  useEffect(() => {
    async function generateImage() {
      try {
        const timeNow = new Date();
        const IpAddress = await Network.getIpAddressAsync();
        console.log('FileSystem', FileSystem.cacheDirectory)
        console.log('IpAddress', IpAddress)
        const timeString = timeNow.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        FFmpegKitConfig.setFontDirectory('/system/fonts')

        const command = `-listen 1 -i rtmp://martin-riedl.de/stream01`;
        const session = await FFmpegKit.execute(command);

        const returnCode = await session.getReturnCode();
        if (!ReturnCode.isSuccess(returnCode)) {
          setError('Failed to generate Stream.');
          setIsLoading(false);
          return;
        }

        FFmpegKitConfig.enableLogCallback(log => {
          const message = log.getMessage();
        });

        if (client) {
          // const imageUri = `${FileSystem.cacheDirectory}scoreImage.jpg`;
          // await client.loadMedia({
          //   mediaInfo: {
          //     contentUrl: imageUri,
          //     contentType: 'image/*',
          //   },
          // });
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error generating Stream:', error);
        setError('An error occurred during Stream generation.');
        setIsLoading(false);
      }
    }

    if (client) {
      generateImage();
    }
  }, [client]);

  return (
    <View style={styles.container}>
      <CastButton style={{ width: 24, height: 24, tintColor: 'blue', marginRight: 20 }} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : null}
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
