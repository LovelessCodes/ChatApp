import { Button, Text, View } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../lib";

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;
export default function Chat({ navigation, route }: Props): JSX.Element {
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
    <View>
      <Text>Chat</Text>
      <Button title="Send Message"/>
      {/* <Button title="Camera" onPress={() => navigation.navigate('Camera')}/> */}
    </View>
  );
}