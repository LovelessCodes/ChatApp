import { Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from "../lib";

type SocialButtonProps = {
  icon: string;
  onPress: () => void;
  title?: string;
}

export default function SocialButton(props: SocialButtonProps): JSX.Element {
  return (
    <TouchableOpacity style={styles.bottomButton} onPress={props.onPress}>
      <Icon name={props.icon} size={24}/>
      {
        props.title &&
        <Text>{props.title}</Text>
      }
    </TouchableOpacity>
  );
}