import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import GoogleCast from 'react-native-google-cast';
import { CastButton, useRemoteMediaClient } from 'react-native-google-cast';
import { FFmpegKit, FFmpegKitConfig, ReturnCode } from 'ffmpeg-kit-react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const client = useRemoteMediaClient();

  useEffect(() => {
    if (client) {
      const intervalId = setInterval(() => {
        generateImage();
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [client]);

  const generateImage = async () => {
    try {
      const timeNow = new Date();
      const timeString = timeNow.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      FFmpegKitConfig.setFontDirectory('/system/fonts')

      const command = `-y -f lavfi -i color=c=white:s=1920x1080 -vf "drawtext=text='${timeString}':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=48:fontcolor=black" -frames:v 1 ${FileSystem.cacheDirectory}scoreImage.png`;
      const session = await FFmpegKit.execute(command);

      const returnCode = await session.getReturnCode();
      if (!ReturnCode.isSuccess(returnCode)) {
        setError('Failed to generate image.');
        setIsLoading(false);
        return;
      }

      const imageUri = `${FileSystem.cacheDirectory}scoreImage.jpg`;
      setImageUri(imageUri);

      if (client) {
        await client.loadMedia({
          mediaInfo: {
            contentUrl: imageUri,
            contentType: 'image/*',
          },
        });
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('An error occurred during image generation.');
      setIsLoading(false);
    }
  };

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
