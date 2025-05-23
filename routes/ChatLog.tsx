import { StackScreenProps } from "@react-navigation/stack";
import { Message, RootStackParamList } from "../types";
import { useEffect, useState } from "react";
import { getObjectData, getStringData } from "../utils/asyncUtils";
import { getTimeAgo } from "../utils/dateUtils";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Platform,
} from "react-native";
import NavigateBtn from "../components/Button";

type ChatLogProps = StackScreenProps<RootStackParamList, "ChatLog">;

export const ChatLog = ({ route, navigation }: ChatLogProps) => {
    const [chatLog, setChatLog] = useState<Message[]>([]);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const start = async () => {
            const log =
                (await getObjectData("messageLog")) || ([] as Message[]);
            setChatLog(log);
            const name = (await getStringData("name")) as string;
            setName(name);
        };
        start();
    }, []);

    const getGrowthEmoji = (growth: number) => {
        if (growth < 0) return "💔";
        if (growth < 0.3) return "😊";
        if (growth < 0.6) return "😡";
        return "😠";
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>대화 기록</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                {chatLog.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            아직 대화 기록이 없습니다
                        </Text>
                    </View>
                ) : (
                    chatLog.map((message, index) => (
                        <View key={index} style={styles.messageContainer}>
                            <View style={styles.messageHeader}>
                                <Text style={styles.messageDate}>
                                    {getTimeAgo(message.date)}
                                </Text>
                                <Text style={styles.growthEmoji}>
                                    {getGrowthEmoji(message.growth)}
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.messageBubble,
                                    message.growth < 0
                                        ? styles.positiveMessage
                                        : styles.negativeMessage,
                                ]}
                            >
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
                    screenName="Main"
                    params={{ name: name }}
                    style={styles.backButton}
                    text="돌아가기"
                    textStyle={styles.backButtonText}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(78, 102, 74)",
    },
    header: {
        alignItems: "center",
        paddingTop: Platform.OS === "ios" ? 20 : 40,
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
    messageHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    messageDate: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 12,
    },
    growthEmoji: {
        fontSize: 16,
    },
    messageBubble: {
        padding: 15,
        borderRadius: 15,
        maxWidth: "100%",
    },
    positiveMessage: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    negativeMessage: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
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
    backButton: {
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
    backButtonText: {
        color: "rgb(78, 102, 74)",
        fontSize: 16,
        fontWeight: "600",
    },
});
