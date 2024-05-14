import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text, PermissionsAndroid, Button  } from 'react-native';
import { CastButton, MediaHlsSegmentFormat, MediaHlsVideoSegmentFormat, useRemoteMediaClient } from 'react-native-google-cast';
import { FFmpegKit, FFmpegKitConfig, ReturnCode } from 'ffmpeg-kit-react-native';
import * as FileSystem from 'expo-file-system';
import * as Network from 'expo-network';



export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const client = useRemoteMediaClient();

  async function getFile (){
    const outputDirectory = FileSystem.cacheDirectory;
    const directoryContents = await FileSystem.readDirectoryAsync(outputDirectory);
    console.log('Directory Contents:', directoryContents);
  }


    
    async function generateStream() {
      try {
        const outputDirectory = FileSystem.cacheDirectory;
        const outputFilePath = `${outputDirectory}output.m3u8`;
    
        // Generate stream without audio
        const command = `-f lavfi -i color=c=red -vf "fps=30" -hls_flags delete_segments -hls_list_size 0 -hls_time 2 ${outputFilePath}`;
        const session = await FFmpegKit.execute(command);
    
        const returnCode = await session.getReturnCode();
        if (!ReturnCode.isSuccess(returnCode)) {
          setError('Failed to generate stream.');
          setIsLoading(false);
          return;
        }
    
        if (client) {
          await client.loadMedia({
            mediaInfo: {
              contentUrl: outputFilePath,
              contentType: 'application/x-mpegURL',
              streamType: 'buffered',
              MediaHlsVideoSegmentFormat: 'MPEG2-TS',
              MediaHlsSegmentFormat: 'TS'
            },
            autoplay: true,
          });
        }
    
        setIsLoading(false);
      } catch (error) {
        console.error('Error generating stream:', error);
        setError('An error occurred during stream generation.');
        setIsLoading(false);
      }
    }
    
    useEffect(() => {
      if(client){
        generateStream();
      }else{
        FFmpegKit.cancel()
      }
    }, [client]);
    


  return (
    <View style={styles.container}>
      <CastButton style={{ width: 24, height: 24, tintColor: 'blue', marginRight: 20 }} />
      <Button title='Cache' onPress={() => getFile()}/>
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
