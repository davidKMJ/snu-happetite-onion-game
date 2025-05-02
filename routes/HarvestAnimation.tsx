import { StackScreenProps } from "@react-navigation/stack";
import { Message, RootStackParamList } from "../types";
import { View, Text } from "react-native";
import NavigationBtn from "../components/Button";
import { useEffect, useState } from "react";
import { getObjectData, getStringData } from "../utils/asyncUtils";
import AutoHeightImage from "react-native-auto-height-image";
import image from "../assets/onion_harvest.png";

type HarvestAnimationProps = StackScreenProps<
    RootStackParamList,
    "HarvestAnimation"
>;

export const HarvestAnimation = ({ route, navigation }: HarvestAnimationProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Harvest");
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgb(78, 102, 74)" }}
        >
            <AutoHeightImage source={image as any} width={200} style={{ marginBottom: 10, alignSelf: 'center', position: 'absolute', bottom: '40%'}} />
            <View style={{alignContent: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: '20%', width: '60%', backgroundColor: 'white', height:'8%', borderRadius: 20, borderColor: 'rgb(78, 102, 74)', borderWidth: 3}}>
                <Text style={{color:'rgb(78, 102, 74)', fontSize:17}}>... ... 오잉!?</Text>
                <Text style={{color:'rgb(78, 102, 74)', fontSize:17}}>비난 양파의 상태가... ...!</Text>
            </View>
        </View>
    );
};
