import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoUri, setVideoUri] = useState(null);

  useEffect(() => {
    generateVideo();
  }, []);

  const generateVideo = async () => {
    try {
      // Execute FFmpeg command to generate video
      const command = '-f lavfi -i testsrc=duration=5:size=1280x720:rate=120 test.mp4';
      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();
      console.log('returnCode',returnCode);
      if (ReturnCode.isSuccess(returnCode)) {
        console.log('FFMPEG Success');
        // setVideoUri('file://path/to/your/generated/video.mp4'); // Replace with actual file path
      } else if (ReturnCode.isCancel(returnCode)) {
        console.log('FFMPEG CANCEL');
        setError('FFMPEG command was cancelled.');
      } else {
        console.log('FFMPEG Error');
        setError('An error occurred during FFmpeg execution.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : videoUri ? (
        <Text>{videoUri}</Text>
      ) : (
        <Text>No video to display</Text>
      )}
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
