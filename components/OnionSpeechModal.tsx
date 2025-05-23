import { Image, Modal, StyleSheet, View } from "react-native";
import { Text } from "react-native";

type SpeechBubble = {
  isVisible: boolean;
};

export const OnionSpeechModal = ({ isVisible }: SpeechBubble) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.view}>
        <Image
          style={styles.speech_bubble}
          source={require("../assets/speech_bubble.png")}
        ></Image>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    top: "36%",
    right: "17%",
  },
  speech_bubble: {
    width: 88,
    height: 63,
  },
});
