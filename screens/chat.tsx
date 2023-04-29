import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, TextInput, View } from "react-native";
import { styles, type Message, type RootStackParamList } from "../lib";

dayjs.extend(relativeTime);
type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function Chat({ navigation, route }: Props): JSX.Element {

  const [ msgs, setMsgs ] = useState<Message[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ refreshing, setRefreshing ] = useState<boolean>(false);
  const [ limit, setLimit ] = useState<number>(50);

  const [msgText, setMsgText] = useState<string>('');

  const msgDocu = firestore().collection('messages');

  useLayoutEffect(() => {
    const unsubscribe = msgDocu.limit(limit).where('roomId', '==', route.params.roomId).orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      Promise.all(snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: doc.id,
          roomId: data.roomId,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user,
          image: data.image,
        }
      })).then((result: Message[]) => {
        setMsgs(result);
        if (loading) setLoading(false);
        if (refreshing) setRefreshing(false);
      })
    })
    navigation.setOptions({
      headerTitle: route.params.roomName,
    })
    return () => unsubscribe();
  }, [limit]);

  const loadMore = () => {
    if (refreshing) return;
    if (msgs.length < limit) return;
    setRefreshing(true);
    setLimit(limit + 50);
  };

  const sendMsg = () => {
    msgDocu.add({
      roomId: route.params.roomId,
      text: msgText,
      createdAt: new Date(),
      user: {
        _id: auth().currentUser?.uid,
        name: auth().currentUser?.displayName,
        avatar: auth().currentUser?.photoURL,
      },
    });
    setMsgText('');
  }

  function renderMessage({ item }: {item: Message}) {
    return (
      <View key={item._id} style={styles.msg}>
        <View>
          <Image source={{ uri: item.user.avatar }} style={{ height: 50, width: 50 }}/>
        </View>
        <View style={styles.msgView}>
          {item.user._id == auth().currentUser?.uid ? (
            <View style={styles.msgAuthor}>
              <Text style={styles.msgUser}>You</Text>
              <Text style={styles.msgTime}>   • {dayjs(item.createdAt).fromNow()}</Text>
            </View>
          ) : (
            <View style={styles.msgAuthor}>
              <Text style={styles.msgUser}>{item.user.name}</Text>
              <Text style={styles.msgTime}>{dayjs(item.createdAt).fromNow()}</Text>
            </View>
          )}
          <Text>{item.text}</Text>
        </View>
      </View>
    )
  }

  // Todo:
  // - Send picture

  if (loading) return (
    <View style={styles.centeredAll}>
      <ActivityIndicator size={80}/>
    </View>
  );

  return (
    <View style={styles.chatView}>
      <FlatList
        style={styles.chatBox}
        onEndReached={() => loadMore()}
        renderItem={renderMessage}
        data={msgs}
        inverted={true}
        refreshControl={
          <RefreshControl refreshing={refreshing}/>
        }
        />
      <View style={styles.msgBox}>
        <TextInput
          multiline={false}
          value={msgText}
          onChangeText={setMsgText}
          onSubmitEditing={(e) => {
            e.preventDefault()
            sendMsg()
          }}
          placeholder="Message ..."
          style={styles.msgInput}
          />
      </View>
    </View>
  );
}