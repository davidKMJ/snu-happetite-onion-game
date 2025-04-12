import { StackScreenProps } from "@react-navigation/stack"
import { Message, RootStackParamList } from "../types"
import { useEffect, useState } from "react"
import { getObjectData, getStringData } from "../utils/asyncUtils"
import { View, Text } from "react-native"
import NavigateBtn from "../components/Button"

type ChatLogProps = StackScreenProps<RootStackParamList, 'ChatLog'>

export const ChatLog = ({ route, navigation }: ChatLogProps) => {
    const [chatLog, setChatLog] = useState<Message[]>([]);
    const [name, setName] = useState<string>('');
    useEffect(() => {
        const start = async () => {
            const log = await getObjectData('messageLog') || [] as Message[];
            setChatLog(log);
            const name = await getStringData('name') as string;
            setName(name);
        }
        start();
    }
    , [])
    return (
        <View>
            {chatLog.map((message, index) => (
                <View key={index}>
                    <Text>{message.text}</Text>
                    <Text>{message.growth}</Text>
                    <Text>{message.date.toString()}</Text>
                </View>
            ))}
            <NavigateBtn
                navigation={navigation}
                screenName="Main"
                params={{ name: name }}
            />
        </View>
    )
}