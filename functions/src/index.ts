import * as admin from "firebase-admin";
import {MessagingTopicResponse} from
  "firebase-admin/lib/messaging/messaging-api";
import * as functions from "firebase-functions";

admin.initializeApp();

export const sendNotification = functions
    .firestore
    .document("messages/{docId}")
    .onCreate(async (change: functions.firestore.QueryDocumentSnapshot) => {
      const message = change.data();
      const roomId = message.roomId;
      const {data} = await admin.firestore()
          .collection("rooms").doc(roomId).get();
      const room = data();
      if (!room) return false;
      const text = message.image ?
        "📸 " + message.user.name +
        " sent a photo" : message.text;
      const msg: admin.messaging.MessagingPayload = {
        data: {
          notifee: JSON.stringify({
            title: room.name,
            body: text,
            android: {
              channelId: roomId,
            },
          }),
        },
      };
      admin.messaging().sendToTopic(roomId, msg)
          .then((response: MessagingTopicResponse) => {
            console.log("Successfully sent message:", response);
          }).catch((error: any) => {
            console.log("Error sending message:", error);
          });
      return true;
    });
