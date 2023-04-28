import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../lib";

type Props = NativeStackScreenProps<RootStackParamList, 'Rooms'>;
export default function Rooms({ navigation }: Props): JSX.Element {
  // Todo:
  // - Get rooms from Firebase
  // - Display rooms
  // - Create room functionality
  return (
    <View>
      <Text>Rooms</Text>
      <Button title="Create Room"/>
    </View>
  );
}