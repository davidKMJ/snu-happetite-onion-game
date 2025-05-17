import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";
import AutoHeightImage from "react-native-auto-height-image";
import onionDeath from "../assets/onion_death.png";

type DeathAnimationProps = StackScreenProps<
    RootStackParamList,
    "DeathAnimation"
>;

export const DeathAnimation = ({ route, navigation }: DeathAnimationProps) => {
    const { deathMessage } = route.params;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;

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
                <AutoHeightImage
                    source={onionDeath as any}
                    width={200}
                    style={styles.image}
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
