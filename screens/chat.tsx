import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, RefreshControl, Text, TextInput, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { joinRoom, styles, trimStr, userRooms } from "../lib";
import type { Message, RootStackParamList } from "../lib/types";

dayjs.extend(relativeTime);
type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export default function Chat({ navigation, route }: Props): JSX.Element {

  const [msgs, setMsgs] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(50);
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

  const uploadImage = async (type: string) => {
    let result;
    if (type == "gallery") {
      result = await launchImageLibrary({
        mediaType: 'photo',
        includeExtra: true,
      });
    } else {
      result = await launchCamera({
        mediaType: 'photo',
        includeExtra: true,
        saveToPhotos: true,
      });
    }
    if (result.didCancel) return;
    if (result.errorMessage) return;
    if (!result.assets) return;
    if (result.assets.length == 0) return;
    if (!result.assets[0].uri) return;
    const user = auth().currentUser;
    if (!user) return;
    const reference = storage().ref(`${user.uid} ${dayjs(result.assets[0].timestamp).unix()}.jpg`);
    await reference.putFile(result.assets[0].uri);
    const url = await reference.getDownloadURL();
    sendMsg(url, true);
    setShowImage(false);
  }

  const isUserApartOfRoom = async (text: string = "", image: boolean = false) => {
    let actualText = text != "" ? trimStr(text) : trimStr(msgText)
    if (actualText == "" && !image) {
      setMsgText('');
      return
    };

    if (auth().currentUser == null) return;

    const rooms = await userRooms(auth().currentUser!.uid);
    if (!rooms.find((room: string | number) => room == route.params.roomId)) {
      Alert.alert(`Join ${route.params.roomName}?`, `I can see you are not a member of this room. Do you want to join?`, [
        { text: 'Cancel', style: 'cancel', onPress: () => { setMsgText(''); } },
        {
          text: 'Join', onPress: () => {
            joinRoom(auth().currentUser!.uid, route.params.roomId)
            if (image) {
              uploadImage(text);
            } else {
              sendMsg(actualText, image)
            }
          }
        },
      ]);
    } else {
      if (image) {
        uploadImage(text);
      } else {
        sendMsg(actualText, image)
      }
    }
  }

  const sendMsg = async (text: string, image: boolean) => {
    msgDocu.add({
      roomId: route.params.roomId,
      text: text,
      createdAt: new Date(),
      user: {
        _id: auth().currentUser?.uid,
        name: auth().currentUser?.displayName,
        avatar: auth().currentUser?.photoURL,
      },
      image: image,
    });
    setMsgText('');
  }

  function renderMessage({ item }: { item: Message }) {
    return (
      <View key={item._id} style={styles.msg}>
        <View>
          <Image source={{ uri: item.user.avatar }} style={{ height: 50, width: 50 }} />
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
          {item.image ? (
            <Image source={{ uri: item.text }} style={{ height: 200, width: 200 }} />
          ) : (
            <Text>{item.text}</Text>
          )}
        </View>
      </View>
    )
  }

  if (loading) return (
    <View style={styles.centeredAll}>
      <ActivityIndicator size={80} />
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
          <RefreshControl refreshing={refreshing} />
        }
      />
      {showImage ? (
        <View style={styles.msgBox}>
          <TouchableOpacity style={styles.cameraButton} onPress={() => isUserApartOfRoom("camera", true)}>
            <Icon name="camera" size={24} />
            <Text>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={() => isUserApartOfRoom("gallery", true)}>
            <Icon name="image" size={24} />
            <Text>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.cameraButton, width: '7%' }} onPress={() => setShowImage(false)}>
            <Icon name="chevron-left" size={16} />
          </TouchableOpacity>
          <TextInput
            multiline={false}
            value={msgText}
            onChangeText={setMsgText}
            onSubmitEditing={(e) => {
              e.preventDefault()
              isUserApartOfRoom()
            }}
            placeholder="Message ..."
            style={styles.msgInput}
          />
        </View>
      ) :
        (
          <View style={styles.msgBox}>
            <TouchableOpacity style={styles.cameraButton} onPress={() => setShowImage(true)}>
              <Icon name="plus" size={24} />
            </TouchableOpacity>
            <TextInput
              multiline={false}
              value={msgText}
              onChangeText={setMsgText}
              onSubmitEditing={(e) => {
                e.preventDefault()
                isUserApartOfRoom()
              }}
              placeholder="Message ..."
              style={styles.msgInput}
            />
          </View>
        )}
    </View>
  );
}