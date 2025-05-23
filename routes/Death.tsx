import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useEffect, useState } from "react";
import { clearAllData, getObjectData, getStringData } from "../utils/asyncUtils";
import { calculateDaysPassed, formatDate } from "../utils/dateUtils";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Platform,
    Image,
} from "react-native";
import NavigateBtn from "../components/Button";
import { getKoreanParticle } from "../utils/stringUtils";

type DeathProps = StackScreenProps<RootStackParamList, "Death">;

export const Death = ({ route, navigation }: DeathProps) => {
    const [chatLog, setChatLog] = useState<any[]>([]);
    const [name, setName] = useState<string>("");
    const [daysPassed, setDaysPassed] = useState<number>(0);

    useEffect(() => {
        const start = async () => {
            const log = (await getObjectData("messageLog")) || ([] as any[]);
            const name = (await getStringData("name")) as string;
            const days = await calculateDaysPassed();

            setChatLog(log);
            setName(name);
            setDaysPassed(days);
        };
        start();
    }, []);

    const { width: imgWidth, height: imgHeight } = Image.resolveAssetSource(require("../assets/onion_death.png"));
    const aspectRatio = imgHeight / imgWidth;
    const height = 100 * aspectRatio;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../assets/onion_death.png")}
                    style={{ width: 100, height: height, marginBottom: 10}}
                />
                <Text style={styles.title}>양파가 죽었습니다</Text>
                <Text style={styles.subtitle}>
                    {name}
                    {getKoreanParticle(name)} {daysPassed}일 만에 너무 많은
                    칭찬을 받아 죽었습니다
                </Text>
            </View>

            <ScrollView style={styles.scrollView}>
                {chatLog.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            대화 기록이 없습니다
                        </Text>
                    </View>
                ) : (
                    chatLog.map((message, index) => (
                        <View key={index} style={styles.messageContainer}>
                            <Text style={styles.messageDate}>
                                {formatDate(message.date)}
                            </Text>
                            <View style={styles.messageBubble}>
                                <Text style={styles.messageText}>
                                    {message.text}
                                </Text>
                            </View>
                            <Text style={styles.growthText}>
                                성장도: {message.growth > 0 ? "+" : ""}
                                {message.growth.toFixed(2)}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>

            <View style={styles.footer}>
                <NavigateBtn
                    navigation={navigation}
                    screenName="Onboarding"
                    style={styles.restartButton}
                    text="다시 시작하기"
                    textStyle={styles.restartButtonText}
                    onPress={clearAllData}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333",
    },
    header: {
        alignItems: "center",
        paddingTop: Platform.OS === "ios" ? 0 : 40,
        paddingBottom: 20,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    headerImage: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.8)",
    },
    scrollView: {
        flex: 1,
        padding: 15,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
    emptyText: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 16,
    },
    messageContainer: {
        marginBottom: 20,
    },
    messageDate: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 12,
        marginBottom: 5,
    },
    messageBubble: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 15,
        borderRadius: 15,
    },
    messageText: {
        color: "white",
        fontSize: 16,
        lineHeight: 22,
    },
    growthText: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    },
    footer: {
        padding: 15,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    restartButton: {
        backgroundColor: "white",
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    restartButtonText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "600",
    },
});
