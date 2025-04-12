import { Onion } from "../components/Onion";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import NavigateBtn from "../components/Button";
import { useState } from "react";
import { storeStringData } from "../utils/asyncUtils";
import { storeStartingDate } from "../utils/dateUtils";

export const Onboarding = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    return (
        <View>
            <Onion />
            <Text>Name Your Onion</Text>
            <TextInput 
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200 }}
                placeholder="Name your onion"
                onChangeText={(text) => setName(text)}
            />
            <NavigateBtn
                navigation={navigation}
                screenName="Main"
                params={{name: name}}
                onPress={async () => {await storeStringData('name', name); await storeStartingDate()}}
            />
        </View>
        
    )
}
