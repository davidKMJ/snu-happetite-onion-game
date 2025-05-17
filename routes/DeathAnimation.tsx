import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { View, Text, StyleSheet, Animated, Dimensions, Image } from "react-native";
import { useEffect, useRef } from "react";
import onionDeath from "../assets/onion_death.png";
import { storeStringData } from "../utils/asyncUtils";

type DeathAnimationProps = StackScreenProps<
    RootStackParamList,
    "DeathAnimation"
>;

export const DeathAnimation = ({ route, navigation }: DeathAnimationProps) => {
    const { deathMessage } = route.params;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const { width: imgWidth, height: imgHeight } = Image.resolveAssetSource(require("../assets/onion_harvest_animation.png"));
    const screenWidth = Dimensions.get("window").width;
    const aspectRatio = imgHeight / imgWidth;
    const height = screenWidth * 0.5 * aspectRatio;

    useEffect(() => {
        // Fade in animation
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        // Navigate to Death screen after animation
        const timer = setTimeout(() => {
            storeStringData("lastScreenName", "Death");
            navigation.replace("Death");
        }, 5000);

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
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>{deathMessage}</Text>
                </View>
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
        justifyContent: "center",
    },
    image: {
        marginBottom: 20,
    },
    messageContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 15,
        width: "80%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    message: {
        color: "rgb(78, 102, 74)",
        fontSize: 16,
        textAlign: "center",
        lineHeight: 24,
    },
});
