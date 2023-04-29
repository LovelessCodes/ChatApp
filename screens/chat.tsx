import { Text, TextInput, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Message, RootStackParamList, styles } from "../lib";
import { useCallback, useLayoutEffect, useState } from "react";
import auth from '@react-native-firebase/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function Chat({ navigation, route }: Props): JSX.Element {

  navigation.setOptions({ title: route.params.roomId.toString() })

  const [ msgs, setMsgs ] = useState<Message[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ limit, setLimit ] = useState<number>(50);

  const msgDocu = firestore().collection('messages');

  useLayoutEffect(() => {
    const subscribe = msgDocu.limit(limit).onSnapshot(snapshot => {
      setMsgs(snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          timestamp: data.timestamp,
          user: data.user,
          image: data.image,
          video: data.video,
          audio: data.audio,
          system: data.system,
          edited: data.edited,
        }
      }));
    })
    if (loading) setLoading(false);
    return () => subscribe();
  }, []);

  // Todo:
  // - Chat
  // - Send picture
  // - Send text
  // - Send emoji
  // - Reply
  // - Edit
  // - Delete
  // - Avatars
  // - Timestamps
  // - Get last 50 messages in Room with Room ID
  // - Get pagination of messages
  return (
    <View style={styles.chatView}>
      <View style={styles.chatBox}>
        {/* Insert a map with the loaded messages */}
      </View>
      <View style={styles.msgBox}>
        <TextInput placeholder="Message ..." style={styles.msgInput} />
        <TouchableOpacity style={styles.msgButton}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
      {/* <Button title="Camera" onPress={() => navigation.navigate('Camera')}/> */}
    </View>
  );
}