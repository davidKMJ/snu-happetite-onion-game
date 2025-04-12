import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { Icon } from "../components/Icon";
import { Onion } from "../components/Onion";
import { calculateDaysPassed } from "../utils/dateUtils";
import { useEffect, useState } from "react";
import NavigationBtn from "../components/Button";
import { Message, RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { clearAllData, getObjectData, getStringData, storeObjectData, storeStringData } from "../utils/asyncUtils";
import { MessageModal } from "../components/Modal";

type MainProps = StackScreenProps<RootStackParamList, 'Main'>

export const Main = ({ route, navigation }: MainProps) => {
    const MAX_GROWTH = 20;
    const { name } = route.params;
    const [daysPassed, setDaysPassed] = useState(0);
    const [text, setText] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        const calculateDays = async () => {
            const days = await calculateDaysPassed();
            setDaysPassed(days);
        }
        calculateDays();
    }
    , [])
    useEffect(() => {
        const timer = setTimeout(() => {
            setModalVisible(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [isModalVisible])
    const onPress = async () => {
        if (text) {
            const messageLog = await getObjectData('messageLog') || [] as Message[];
            const newMessage = {
                text: text,
                growth: Math.random() * 10,
                date: new Date()
            };
            messageLog.push(newMessage);
            await storeObjectData('messageLog', messageLog);
            const currentGrowth = parseFloat(await getStringData('currentGrowth') || '0');
            if (currentGrowth + newMessage.growth > MAX_GROWTH) {
                navigation.navigate('HarvestAnimation')
            } else if (newMessage.growth < 0) {
                navigation.navigate('DeathAnimation')
            } else {
                const newGrowth = currentGrowth + newMessage.growth;
                await storeStringData('currentGrowth', newGrowth.toString());
                setModalVisible(true);
            }
        } else {
            console.log("Please enter a message before sending.");
        }
    }
    return (
        <View>
            <Icon />
            <Text>{daysPassed} days passed</Text>
            <NavigationBtn
                navigation={navigation}
                screenName="ChatLog"
            />
            <Onion />
            <MessageModal
                isVisible={isModalVisible}
                message={text}
            />
            <Text>name {name}</Text>
            <Text>Type what you want to say to the onion</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }}
                placeholder="Type your message"
                onChangeText={(text) => setText(text)}
            />
            <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
                onPress={onPress}
            ><Text style={{ color: 'white' }}>Send</Text></TouchableOpacity>
            <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
                onPress={async () => await clearAllData()}
            ><Text style={{ color: 'white' }}>Purge All Data</Text></TouchableOpacity>
        </View>
    )
}