import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { View, Text, StyleSheet, Animated, Dimensions, Image } from "react-native";
import { useEffect, useRef } from "react";
import onionHarvest from "../assets/onion_harvest.png";
import { storeStringData } from "../utils/asyncUtils";

type HarvestAnimationProps = StackScreenProps<
    RootStackParamList,
    "HarvestAnimation"
>;

export const HarvestAnimation = ({ navigation }: HarvestAnimationProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;

    const { width: imgWidth, height: imgHeight } = Image.resolveAssetSource(require("../assets/onion_harvest_animation.png"));
    const screenWidth = Dimensions.get("window").width;
    const aspectRatio = imgHeight / imgWidth;
    const height = screenWidth * 0.5 * aspectRatio;
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            storeStringData("lastScreenName", "Harvest");
            navigation.replace("Harvest");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Image
                    source={require("../assets/onion_harvest_animation.png")}
                    style={{ width: screenWidth * 0.5, height: height, marginBottom: 20 }}
                />
                <Text style={styles.message}>축하합니다!</Text>
                <Text style={styles.subMessage}>
                    양파가 무사히 수확되었습니다
                </Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(78, 102, 74)",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        alignItems: "center",
    },
    image: {
        marginBottom: 20,
    },
    message: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    subMessage: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
    },
});
