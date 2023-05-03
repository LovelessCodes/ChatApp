import notifee, { EventType } from '@notifee/react-native';
import auth from '@react-native-firebase/auth';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer, useLinkTo } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { envs } from './env';
import { styles } from './lib';
import { linking } from './lib/configs';
import type { RootStackParamList } from './lib/types';
import Chat from './screens/chat';
import Login from './screens/login';
import Rooms from './screens/rooms';

import { PermissionsAndroid } from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const Stack = createNativeStackNavigator<RootStackParamList>();

GoogleSignin.configure({
  webClientId: envs.GOOGLE_WEB_CLIENT_ID,
})

const AuthenticatedUserContext = createContext({
  user: null,
  setUser: (user: any) => { }
})

const AuthenticatedUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{
      headerStyle: { backgroundColor: '#173448' },
      animation: 'fade',
      headerTitleStyle: { color: '#F0F0F4', fontWeight: '700' },
    }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

async function onMessageReceived(message: FirebaseMessagingTypes.RemoteMessage) {
  if (!message.data) return;
  notifee.displayNotification(JSON.parse(message.data.notifee));
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

function ChatStack() {
  const link = useLinkTo();

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.PRESS:
          link(`/chat/${detail.notification?.android?.channelId}/${detail.notification?.title}`)
          break;
      }
    });
  }, []);

  return (
    <Stack.Navigator initialRouteName="Rooms" screenOptions={{
      headerStyle: { backgroundColor: '#173448' },
      animation: 'fade',
      headerTitleStyle: { color: '#F0F0F4', fontWeight: '700' },
      headerRight: () => (
        <TouchableOpacity onPress={() => auth().signOut()} style={styles.headerButton}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      )
    }
    }>
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  )
}

function Root(): JSX.Element {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      setUser(user);
      if (loading) setLoading(false);
    })
  }, [])

  if (loading) return (
    <SafeAreaView style={styles.centeredAll}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );

  return (
    <NavigationContainer linking={linking}>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function App(): JSX.Element {
  return (
    <AuthenticatedUserProvider>
      <Root />
    </AuthenticatedUserProvider>
  );
}

export default App;
