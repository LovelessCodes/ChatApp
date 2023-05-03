import auth from '@react-native-firebase/auth';
import { GoogleSignin, NativeModuleError, statusCodes } from '@react-native-google-signin/google-signin';
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import SocialButton from "../components/socialButton";
import { styles } from "../lib";

export default function Login(): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const facebookSignIn = async () => {
    setLoggingIn(true);
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      console.log("User cancelled login");
      setError("User cancelled login");
      return
    } else if (result.declinedPermissions) {
      console.log("User declined permissions");
      setError("User declined permissions");
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
    setLoggingIn(true);
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (err: unknown) {
      const error = err as NativeModuleError;
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

  if (loggingIn) return (
    <View style={styles.centeredAll}>
      <ActivityIndicator size={80} />
    </View>
  );

  return (
    <View style={styles.loginView}>
      <SocialButton icon="google" title="Login with Google" onPress={() => googleSignIn().then(() => setLoggingIn(false))} />
      <SocialButton icon="facebook" title="Login with Facebook" onPress={() => facebookSignIn().then(() => setLoggingIn(false))} />
      {error ? <View style={styles.errorBox}><Text style={styles.loginError}>{error}</Text></View> : null}
    </View>
  );
}
