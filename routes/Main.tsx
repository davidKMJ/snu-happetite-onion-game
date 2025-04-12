import { View, Text, TextInput } from "react-native"
import { Icon } from "../components/Icon";
import { Onion } from "../components/Onion";
import { calculateDaysPassed } from "../utils/dateUtils";
import { useEffect, useState } from "react";
import NavigationBtn from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export const Main = ({ route }: any) => {
    const { name } = route.params;
    const [daysPassed, setDaysPassed] = useState(0);
    useEffect(() => {
        const calculateDays = async () => {
            const days = await calculateDaysPassed();
            setDaysPassed(days);
        }
        calculateDays();
    }
    , [])
    const navigation = useNavigation();
    return (
        <View>
            <Icon />
            <Text>{daysPassed}</Text>
            <NavigationBtn
                navigation={navigation}
                screenName="ChatLog"
            />
            <Onion />
            <Text>{name}</Text>
            <Text>Type what you want to say to the onion</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }}
                placeholder="Type your message"
                onChangeText={(text) => console.log(text)}
            />
        </View>
    )
}