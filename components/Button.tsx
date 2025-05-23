import { NavigationProps } from "../types";
import { storeStringData } from "../utils/asyncUtils";
import { Text, TouchableOpacity } from "react-native";

const NavigateBtn = ({navigation, screenName, params, onPress, style, text, textStyle}: NavigationProps) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={async () => {
        if (onPress) {
          await onPress();
        }
        await storeStringData('lastScreenName', screenName);
        navigation.replace(screenName, params);
      }}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

export default NavigateBtn;