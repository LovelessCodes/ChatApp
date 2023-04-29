import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from "react-native";
import { RootStackParamList } from "../lib";

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>;

export default function Camera({ route }: Props): JSX.Element {
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