/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Button, useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { type RootStackParamList } from './lib';

// Screens
import Login from './screens/login';
import Rooms from './screens/rooms';
import Chat from './screens/chat';
import Camera from './screens/camera';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}/>
    </Stack.Navigator>
  )
}

function onSignOut() {
  // Sign out function here
}

function ChatStack() {
  return (
    <Stack.Navigator initialRouteName="Rooms" screenOptions={{headerRight: () => (
      <Button onPress={() => onSignOut} title="Sign Out" color="#fff"/>
    )}}>
      <Stack.Screen name="Rooms" component={Rooms}/>
      <Stack.Screen name="Chat" component={Chat}/>
      <Stack.Screen name="Camera" component={Camera}/>
    </Stack.Navigator>
  )
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      { user ? <ChatStack/> : <AuthStack/> }
    </NavigationContainer>
  );
}

export default App;
