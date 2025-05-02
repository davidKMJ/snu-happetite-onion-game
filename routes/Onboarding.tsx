import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { OnionImages } from "../components/Onion";

import NavigateBtn from "../components/Button";
import { useState } from "react";
import { storeStringData } from "../utils/asyncUtils";
import { storeStartingDate } from "../utils/dateUtils";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type OnboardingProps = StackScreenProps<RootStackParamList, 'Onboarding'>

export const Onboarding = ({ route, navigation }: OnboardingProps) => {
    const [name, setName] = useState('');
    const startingOnionImage = OnionImages.GetImage(
        `onion0`
    )
    return (
        <View  style={{ marginLeft: 20, marginRight: 20, alignItems:'center' }}>
            <Image source={startingOnionImage} style={{ width: 200, height: 200, marginBottom: 10, marginTop: '35%' }} />
            <Text>비난 양파의 이름을 지어주세요</Text>
            <TextInput 
                style={{ height: 35, borderColor: 'gray', borderWidth:0, width: '60%', backgroundColor: 'rgb(233, 214, 219)', borderRadius: 15, marginTop: 10, marginBottom: '65%', paddingLeft: 15 }}
                placeholder="이름..."
                onChangeText={(text) => setName(text)}
            />
            <NavigateBtn
                navigation={navigation}
                screenName="Main"
                params={{name: name}}
                onPress={async () => {await storeStringData('name', name); await storeStartingDate(); await storeStringData('currentGrowth', '0'); await storeStringData('level', '0');}}
                style={{ width: '40%', height: 35, backgroundColor: 'rgb(78, 102, 74)', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}
                text='Confirm'
                textStyle={{ color: 'rgb(218, 230, 216)', fontSize: 15, fontWeight: 'bold' }}
            />
        </View>
        
    )
}
