import { StyleSheet } from "react-native";

export type RootStackParamList = {
  Login: undefined;
  Rooms: undefined;
  Chat: { roomId: string };
  Camera: { messageId: string };
}

export type Reaction = {
  _id: string | number;
  messageId: string | number;
  emoji: string;
}

export type Message = {
  _id: string | number;
  text: string;
  timestamp: Date | number;
  user: {
    _id: string | number;
    name: string;
    avatar?: string;
  };
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  edited?: boolean;
}

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});