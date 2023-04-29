import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, SafeAreaView, Text, TouchableOpacity, useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { styles, type RootStackParamList } from './lib';

// Screens
import Login from './screens/login';
import Rooms from './screens/rooms';
import Chat from './screens/chat';
import Camera from './screens/camera';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { envs } from './env';

const Stack = createNativeStackNavigator<RootStackParamList>();

GoogleSignin.configure({
  webClientId: envs.WEB_CLIENT_ID,
})

const AuthenticatedUserContext = createContext({
  user: null,
  setUser: (user: any) => {}
})

const AuthenticatedUserProvider = ({ children }: { children: ReactNode}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      { children }
    </AuthenticatedUserContext.Provider>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{
      headerStyle: { backgroundColor: '#173448' },
      headerTitleStyle: { color: '#F0F0F4', fontWeight: '700' },
    }}>
      <Stack.Screen name="Login" component={Login}/>
    </Stack.Navigator>
  )
}

function ChatStack() {
  return (
    <Stack.Navigator initialRouteName="Rooms" screenOptions={{
      headerStyle: { backgroundColor: '#173448' },
      headerTitleStyle: { color: '#F0F0F4', fontWeight: '700' },
      headerRight: () => (
        <TouchableOpacity onPress={() => auth().signOut()} style={styles.headerButton}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      )}
    }>
      <Stack.Screen name="Rooms" component={Rooms}/>
      <Stack.Screen name="Chat" component={Chat}/>
      <Stack.Screen name="Camera" component={Camera}/>
    </Stack.Navigator>
  )
}

function Root(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const {user, setUser} = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      setUser(user);
      if (loading) setLoading(false);
    })
  }, [])

  if (loading) return (
    <SafeAreaView>
      <ActivityIndicator size="large"/>
      <Text>Loading ...</Text>
    </SafeAreaView>
  );

  return (
    <NavigationContainer>
      { user ? <ChatStack/> : <AuthStack/> }
    </NavigationContainer>
  );
}

function App(): JSX.Element {
  return (
    <AuthenticatedUserProvider>
      <Root/>
    </AuthenticatedUserProvider>
  );
}

export default App;
