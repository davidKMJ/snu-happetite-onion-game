import { NavigationProps } from "../types";
import { storeStringData } from "../utils/asyncUtils";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

const NavigateBtn = ({navigation, screenName, params, onPress, style, text, textStyle}: NavigationProps) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={async () => {
        if (onPress) {
          await onPress();
        }
        await storeStringData('lastScreenName', screenName);
        navigation.navigate(screenName, params);
      }}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

export default NavigateBtn;