import { TouchableOpacity } from "react-native";
import { NavigationProps } from "../types";
import { storeStringData } from "../utils/asyncUtils";

const NavigateBtn = ({navigation, screenName, params, onPress}: NavigationProps) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
      onPress={async () => {
        if (onPress) {
          await onPress();
        }
        await storeStringData('lastScreenName', screenName);
        navigation.navigate(screenName, params);
      }}
    />
  );
}

export default NavigateBtn;