import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../lib";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useState } from "react";
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
export default function Login({ navigation }: Props): JSX.Element {
  // Todo:
  // - Login with Google
  // - Login with Facebook

  const [error, setError] = useState<string | null>(null);

  const facebookSignIn = async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      console.log("User cancelled login");
      setError("User cancelled login");
      return
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      console.log("Something went wrong obtaining access token");
      setError("Something went wrong obtaining access token");
      return
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    return auth().signInWithCredential(facebookCredential);
  }

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled login");
        setError("User cancelled login");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Login already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available");
        setError("Google Play services not available");
      } else {
        console.log("Something went wrong", error);
        setError(`${error.code}: ${error.message}`)
      }
    }
  }
  return (
    <View>
      <Text>Login</Text>
      {/* Needs better error display */}
      { error ? <Text>{error}</Text> : null }
      <Button title="Login with Google" onPress={() => googleSignIn()}/>
      <Button title="Login with Facebook" onPress={() => facebookSignIn()}></Button>
    </View>
  );
}
