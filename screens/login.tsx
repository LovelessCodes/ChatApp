import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../lib";

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
export default function Login({ navigation }: Props): JSX.Element {
  // Todo:
  // - Login with Google
  // - Login with Facebook
  return (
    <View>
      <Text>Login</Text>
      <Button title="Login with Google"></Button>
      <Button title="Login with Facebook"></Button>
    </View>
  );
}