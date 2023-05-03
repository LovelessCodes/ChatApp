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