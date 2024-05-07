import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FFmpegKit } from 'ffmpeg-kit-react-native';

export default function App() {

  FFmpegKit.execute('-i file1.mp4 -c:v mpeg4 file2.mp4').then(async (session) => {
    const returnCode = await session.getReturnCode();
  
    if (ReturnCode.isSuccess(returnCode)) {
      console.log('FFMPEG Success')
      // SUCCESS
  
    } else if (ReturnCode.isCancel(returnCode)) {
      console.log('FFMPEG CANCEL')
      // CANCEL
  
    } else {
      console.log('FFMPEG Error')
      // ERROR
  
    }
  });

  FFmpegKit.cancel();

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
