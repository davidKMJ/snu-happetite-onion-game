import { Modal } from "react-native"
import { Text } from "react-native"

type MessageModalProps = {
    isVisible: boolean,
    message: string
}

export const MessageModal = ({isVisible, message}: MessageModalProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        > 
            <Text>you sent: {message}</Text>
        </Modal>
    )
}