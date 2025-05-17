import { StackScreenProps } from "@react-navigation/stack";
import { Message, RootStackParamList } from "../types";
import { View, Text, Dimensions, Image } from "react-native";
import { useEffect, useState } from "react";

type DeathAnimationProps = StackScreenProps<
    RootStackParamList,
    "DeathAnimation"
>;

export const DeathAnimation = ({ route, navigation }: DeathAnimationProps) => {
    const { width: imgWidth, height: imgHeight } = Image.resolveAssetSource(require("../assets/onion_harvest_animation.png"));
    const screenWidth = Dimensions.get("window").width;
    const aspectRatio = imgHeight / imgWidth;
    const height = screenWidth * 0.5 * aspectRatio;
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
            <Image
                source={require("../assets/onion_harvest_animation.png")}
                style={{ width: screenWidth * 0.5, height: height, alignSelf: 'center', position: 'absolute', bottom: '40%' }}
            />
            <View style={{alignContent: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: '20%', width: '60%', backgroundColor: 'white', height:'8%', borderRadius: 20, borderColor: 'rgb(78, 102, 74)', borderWidth: 3}}>
                <Text style={{color:'rgb(78, 102, 74)', fontSize:17}}>ㅋㅎㅋㅎㅋ 앗?</Text>
                <Text style={{color:'rgb(78, 102, 74)', fontSize:17}}>뭔가 쑥쓰러워... ㅎㅎ</Text>
            </View>
        </View>
    );
};
