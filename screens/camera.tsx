import { Button, Text, View } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../lib";

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>;

export default function Camera({ navigation, route }: Props): JSX.Element {
  // Todo:
  // - Take picture
  // - Upload picture to Firebase
  // - Display picture
  return (
    <View>
      <Text>Camera</Text>
    </View>
  );
}