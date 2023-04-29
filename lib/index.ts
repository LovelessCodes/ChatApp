import { StyleSheet } from "react-native";

export type RootStackParamList = {
  Login: undefined;
  Rooms: undefined;
  Chat: { roomId: string | number };
  Camera: { messageId: string | number };
}

export type Room = {
  _id: string | number;
  name: string;
  description: string;
  createdAt?: Date | number;
  updatedAt?: Date | number;
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
  roomsView: {
    backgroundColor: '#173448',
    color: '#F0F0F4',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  room: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0)',
    borderColor: '#F0F0F4',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    display: 'flex',
    flexDirection: 'column'
  },
  roomTitle: {
    marginTop: 8,
    fontSize: 20,
  },
  roomDescription: {
    fontSize: 16,
    opacity: .6,
    fontWeight: '200',
  },
  bottomButton: {
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0)',
    color: '#F0F0F4',
    borderColor: '#F0F0F4',
    borderWidth: 1,
    marginHorizontal: 25,
    marginVertical: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButton: {
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,0)',
    borderColor: '#F0F0F4',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loginView: {
    backgroundColor: '#173448',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  errorBox: {
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  loginError: {
    width: '80%',
    borderBottomColor: 'rgb(255,0,0)',
    borderBottomWidth: 1,
    textAlign: "center",
  },
  chatView: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: '#173448',
  },
  chatBox: {
    display: "flex",
    backgroundColor: 'rgba(255,255,255,0)',
    flexDirection: "column-reverse",
    height: "95%",
  },
  msgBox: {
    height: "5%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: 'rgba(255,255,255,.2)',
  },
  msgInput: {
    width: "80%",
    paddingHorizontal: 20,
  },
  msgButton: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center"
  }
});