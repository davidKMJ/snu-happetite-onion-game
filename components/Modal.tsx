import { Modal, StyleSheet, View } from "react-native";
import { Text } from "react-native";

type MessageModalProps = {
  isVisible: boolean;
  message: string;
  style?: any;
};

export const MessageModal = ({
  isVisible,
  message,
  style,
}: MessageModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={{ ...style, ...styles.modal_view }}>
        <Text style={styles.modal_text}>{message}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal_view: {
    backgroundColor: "#E4E4E4",
    borderRadius: 20,
    left: 35,
    right: 35,
    height: 68,
  },
  modal_text: {
    color: "#000000",
  },
});
