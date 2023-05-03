import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../lib";
import type { Room, RootStackParamList } from "../lib/types";

dayjs.extend(relativeTime);
type Props = NativeStackScreenProps<RootStackParamList, 'Rooms'>;

export default function Rooms({ navigation }: Props): JSX.Element {

  const [rooms, setRooms] = useState<Room[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const roomDocu = firestore().collection('rooms').limit(10);
  const msgDocu = firestore().collection('messages');

  const refresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    roomDocu.get().then(async snapshot => {
      const result = await Promise.all(snapshot.docs.map(async doc => {
        const data = doc.data();
        const lastMessage = await msgDocu.where('roomId', '==', doc.id).orderBy('createdAt', 'desc').limit(1).get();
        return {
          _id: doc.id,
          name: data.name,
          description: data.description,
          lastMessage: lastMessage.docs[0]?.data().createdAt.toDate(),
        }
      }));
      setRooms(result);
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      if (loading) setLoading(false);
      setRefreshing(false);
    })
  };

  useLayoutEffect(() => {
    refresh();
  }, []);

  function renderRoom({ item }: { item: Room }) {
    return (
      <TouchableOpacity key={item._id} onPress={() => navigation.navigate('Chat', { roomId: item._id, roomName: item.name })} style={styles.room}>
        <View>
          <Text style={styles.roomTitle}>{item.name}</Text>
          <Text style={styles.roomDescription}>{item.description}</Text>
          <Text style={{ opacity: .1 }}>{item.lastMessage ? dayjs(item.lastMessage).fromNow() : 'No last message'}</Text>
        </View>
        <View style={styles.roomIcon}>
          <Icon name="chevron-right" size={20} />
        </View>
      </TouchableOpacity>
    )
  }

  if (loading) return (
    <View style={styles.centeredAll}>
      <ActivityIndicator size={80} />
    </View>
  );

  if (rooms.length === 0) {
    return (
      <View style={styles.centeredAll}>
        <Text>No Rooms</Text>
      </View>
    )
  };

  return (
    <View style={styles.roomsView}>
      <FlatList
        renderItem={renderRoom}
        data={rooms.sort(
          (a, b) => a.lastMessage && b.lastMessage ?
            dayjs(b.lastMessage).unix() - dayjs(a.lastMessage).unix() :
            0
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
      />
    </View>
  );
}