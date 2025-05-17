import { Modal } from "react-native"
import { Text } from "react-native"

type MessageModalProps = {
    isVisible: boolean,
    message: string,
    style?: any
}

export const MessageModal = ({isVisible, message, style}: MessageModalProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        > 
            <Text style={style}>you sent: {message}</Text>
        </Modal>
    )
}