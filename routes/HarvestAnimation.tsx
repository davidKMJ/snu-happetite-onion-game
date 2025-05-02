import { StackScreenProps } from "@react-navigation/stack";
import { Message, RootStackParamList } from "../types";
import { View } from "react-native";
import NavigationBtn from "../components/Button";
import { useEffect, useState } from "react";
import { getObjectData, getStringData } from "../utils/asyncUtils";

type HarvestAnimationProps = StackScreenProps<
    RootStackParamList,
    "HarvestAnimation"
>;

export const HarvestAnimation = ({ route, navigation }: HarvestAnimationProps) => {
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
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <NavigationBtn navigation={navigation} screenName="Onboarding" />
        </View>
    );
};
