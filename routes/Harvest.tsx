import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { View, Image, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { use, useEffect, useState } from "react";
import { getStringData } from "../utils/asyncUtils";

type HarvestProps = StackScreenProps<RootStackParamList, "Harvest">;

export const Harvest = ({ route, navigation }: HarvestProps) => {
    const [name, setName] = useState<string>("");
    const [daysPassed, setDaysPassed] = useState<number>(0);
    const { width: imgWidth, height: imgHeight } = Image.resolveAssetSource(require("../assets/onion_harvest.png"));
    const screenWidth = Dimensions.get("window").width;
    const aspectRatio = imgHeight / imgWidth;
    const height = screenWidth * 0.5 * aspectRatio;
    useEffect(() => {
        const fetch = async () => {
            const name = await getStringData("name");
            if (name) {
                setName(name);
            }
            const daysPassed = await getStringData("daysPassed");
            if (daysPassed) {
                const days = parseInt(daysPassed);
                setDaysPassed(days);
            }
        }
        fetch();
    }
    , []);
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgb(78, 102, 74)" }}>
        <Image
            source={require("../assets/onion_harvest.png")}
            style={{ width: screenWidth * 0.5, height: height, alignSelf: 'center', position: 'absolute', bottom: '70%' }}
        />
        <Text style={styles.nameText}>{name}</Text>
        <View style={{borderColor: 'rgb(161, 199, 155)', borderWidth: 2, borderRadius: 15, width: 'auto', bottom: '58%', alignItems: 'center', position: 'absolute'}}>
            <Text style={{color: 'rgb(161, 199, 155)', fontSize: 20}}>D+{daysPassed}</Text>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    nameText: {
        fontSize: 25,
        textAlign: 'center',
        position: 'absolute', 
        bottom: '63%',
        width: '100%',
        color: 'white',
    },
})