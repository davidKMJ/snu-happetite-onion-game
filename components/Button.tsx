import { TouchableOpacity } from "react-native";
import { NavigationProps } from "../types";

const NavigateBtn = ({navigation, screenName, params, onPress}: NavigationProps) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
      onPress={async () => {
        if (onPress) {
          await onPress();
        }
        navigation.navigate(screenName, params);
      }}
    />
  );
}

export default NavigateBtn;