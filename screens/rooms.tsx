import { NativeStackScreenProps } from "@react-navigation/native-stack";
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator, Button, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList, Room, styles } from "../lib";
import { useLayoutEffect, useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, 'Rooms'>;

export default function Rooms({ navigation }: Props): JSX.Element {
  // Todo:
  // - Display rooms
  // - Create room functionality

  const [ rooms, setRooms ] = useState<Room[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);

  const roomDocu = firestore().collection('rooms').limit(10);

  useLayoutEffect(() => {
    const subscribe = roomDocu.onSnapshot(snapshot => {
      setRooms(snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: doc.id,
          name: data.name,
          description: data.description,
        }
      }));
    })
    if (loading) setLoading(false);
    return () => subscribe();
  }, []);

  if (loading) return (
    <View style={styles.loginView}>
      <ActivityIndicator size="large"/>
      <Text>Loading...</Text>
    </View>
  );

  if (rooms.length === 0) return (
    <View style={styles.loginView}>
      <Text>No Rooms</Text>
    </View>
  );

  return (
    <View style={styles.roomsView}>
      <View>
        {rooms.map(room => (
          <TouchableOpacity key={room._id} onPress={() => navigation.navigate('Chat', { roomId: room._id })} style={styles.room}>
            <Text style={styles.roomTitle}>{room.name}</Text>
            <Text style={styles.roomDescription}>{room.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.bottomButton}>
        <Text>Create Room</Text>
      </TouchableOpacity>
    </View>
  );
}