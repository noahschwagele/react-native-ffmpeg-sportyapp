import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import ChromeCast from './src/components/ChromeCast';
import { useRemoteMediaClient } from 'react-native-google-cast';

export default function App() {
  const client = useRemoteMediaClient();
  
  // Player One
  const [playerOneName, setPlayerOneName] = useState('Player One');
  const [playerOneScore, setPlayerOneScore] = useState(0);
  
  // Player Two
  const [playerTwoName, setPlayerTwoName] = useState('Player Two');
  const [playerTwoScore, setPlayerTwoScore] = useState(0);

  //These Effects will handle a a query to update teh score board on the server side

  useEffect(()=>{
    console.log('Updated ', playerOneName)
  }, [playerOneName])

  useEffect(()=>{
    console.log('Updated ', playerOneScore)
  }, [playerOneScore])

  useEffect(()=>{
    console.log('Updated ', playerTwoName)
  }, [playerTwoName])

  useEffect(()=>{
    console.log('Updated ', playerTwoScore)
  }, [playerTwoScore])
  
  return (
    <>
      <StatusBar style="auto" />
      <View style={{ padding: 15, flexDirection: 'row-reverse', paddingTop: 50 }}>
        <ChromeCast />
      </View>
      
      {/* Manage the Players */}
      <View style={styles.container}>
        {/* Player One Inputs */}
        <TextInput
          style={styles.input}
          value={playerOneName}
          onChangeText={text => setPlayerOneName(text)}
          placeholder="Enter Player One Name"
        />
        <TextInput
          style={styles.input}
          value={playerOneScore.toString()}
          onChangeText={text => setPlayerOneScore(parseInt(text) || 0)}
          keyboardType="numeric"
          placeholder="Enter Player One Score"
        />
        
        {/* Player Two Inputs */}
        <TextInput
          style={styles.input}
          value={playerTwoName}
          onChangeText={text => setPlayerTwoName(text)}
          placeholder="Enter Player Two Name"
        />
        <TextInput
          style={styles.input}
          value={playerTwoScore.toString()}
          onChangeText={text => setPlayerTwoScore(parseInt(text) || 0)}
          keyboardType="numeric"
          placeholder="Enter Player Two Score"
        />
      </View>
    </>
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
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: '80%',
  },
});
