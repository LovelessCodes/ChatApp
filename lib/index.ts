import { StyleSheet } from "react-native";

export type RootStackParamList = {
  Login: undefined;
  Rooms: undefined;
  Chat: { roomId: string | number, roomName: string };
  Camera: { messageId: string | number };
}

export type Room = {
  _id: string | number;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastMessage?: Date;
}

export type Message = {
  _id: string | number;
  roomId: string | number;
  text: string;
  createdAt: Date;
  user: {
    _id: string | number;
    name: string;
    avatar?: string;
  };
  image?: boolean;
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
    flex: 1,
  },
  room: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0)',
    borderColor: 'rgba(255,255,255,.5)',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
  },
  roomIcon: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomText: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '80%',
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
    height: '10%',
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
  centeredAll: {
    backgroundColor: '#173448',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
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
    height: "100%",
    flex: 1,
  },
  chatBox: {
    display: 'flex',
    backgroundColor: 'rgba(255,255,255,0)',
    height: '100%',
    flex: 1,
  },
  msgBox: {
    height: 50,
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,.2)',
  },
  msgInput: {
    width: "85%",
    paddingHorizontal: 20,
  },
  msg: {
    width: '100%',
    display: 'flex',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,.1)',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  msgView: {
    width: '100%',
    paddingHorizontal: 5,
  },
  msgAuthor: {
    display: 'flex',
    position: "relative",
    flexDirection: 'row'
  },
  msgUser: {
    position: "relative",
    opacity: .5,
  },
  msgTime: {
    opacity: .3,
    position: "relative",
    right: 0,
    top: 0,
  },
  cameraButton: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.3)'
  },
});

export function trimStr(str: string) {
  if(!str) return str;
  return str.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, ' ');
}