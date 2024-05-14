import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text, Button, TextInput } from 'react-native';
import { CastButton, useRemoteMediaClient } from 'react-native-google-cast';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoName, setPlayerTwoName] = useState('');
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const client = useRemoteMediaClient();

  async function getFile() {
    const outputDirectory = FileSystem.cacheDirectory;
    const directoryContents = await FileSystem.readDirectoryAsync(outputDirectory);
    console.log('Directory Contents:', directoryContents);
  }

  

  async function generateStream() {
    try {
      const outputDirectory = FileSystem.cacheDirectory;
      const outputFilePath = `${outputDirectory}output.png`;

      const loadReceiverUrl = async () => {
        try {
          if (client) {
            await client.loadMedia({
              mediaInfo: {
                contentUrl: outputFilePath,
                contentType: 'image/*'
              },
            });
          }
        } catch (error) {
          console.error('Error loading custom receiver URL:', error);
        }
      };
  
      // Generate image with player names and scores
      const command = `-y -f lavfi -i color=c=white:s=1920x1080 -vf "drawtext=text='${playerOneName}':x=(w-text_w)/2:y=100:fontcolor=black:fontsize=36,drawtext=text='${playerOneScore}':x=(w-text_w)/2:y=150:fontcolor=black:fontsize=36,drawtext=text='${playerTwoName}':x=(w-text_w)/2:y=400:fontcolor=black:fontsize=36,drawtext=text='${playerTwoScore}':x=(w-text_w)/2:y=450:fontcolor=black:fontsize=36" ${outputFilePath}`;
  
      const session = await FFmpegKit.execute(command);
  
      const returnCode = await session.getReturnCode();
      if (!ReturnCode.isSuccess(returnCode)) {
        setError('Failed to generate image.');
        setIsLoading(false);
        return;
      }
      loadReceiverUrl()
  
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('An error occurred during image generation.');
      setIsLoading(false);
    }
  }
  
  

  useEffect(() => {
    if (client) {
      generateStream();
    } else {
      FFmpegKit.cancel();
    }
  }, [client]);

  return (
    <View style={styles.container}>
      <CastButton style={{ width: 24, height: 24, tintColor: 'blue', marginRight: 20 }} />
      <TextInput
        style={styles.input}
        placeholder="Player One Name"
        onChangeText={text => setPlayerOneName(text)}
        value={playerOneName}
      />
      <TextInput
        style={styles.input}
        placeholder="Player One Score"
        onChangeText={text => setPlayerOneScore(text)}
        keyboardType="numeric"
        value={playerOneScore.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="Player Two Name"
        onChangeText={text => setPlayerTwoName(text)}
        value={playerTwoName}
      />
      <TextInput
        style={styles.input}
        placeholder="Player Two Score"
        onChangeText={text => setPlayerTwoScore(text)}
        keyboardType="numeric"
        value={playerTwoScore.toString()}
      />
      <Button title="Generate Image" onPress={generateStream} />
      <Button title="Cache" onPress={getFile} />
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
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
