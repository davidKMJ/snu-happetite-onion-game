import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    SafeAreaView,
    Platform,
} from "react-native";
import {
    clearAllData,
    getStringData,
    getObjectData,
} from "../utils/asyncUtils";
import { calculateDaysPassed, formatDate } from "../utils/dateUtils";
import AutoHeightImage from "react-native-auto-height-image";
import onionHarvest from "../assets/onion_harvest.png";
import { useEffect, useState } from "react";
import { Message } from "../types";
import * as Clipboard from "expo-clipboard";
import NavigateBtn from "../components/Button";
import { getKoreanParticle } from "../utils/stringUtils";

type HarvestProps = StackScreenProps<RootStackParamList, "Harvest">;

export const Harvest = ({ route, navigation }: HarvestProps) => {
    const [startDate, setStartDate] = useState<string>("");
    const [conversationCount, setConversationCount] = useState<number>(0);
    const [messages, setMessages] = useState<Message[]>([]);
    const [name, setName] = useState<string>("");
    const [daysPassed, setDaysPassed] = useState<number>(0);

    useEffect(() => {
        const loadData = async () => {
            const start = await getStringData("start");
            const messageLog =
                ((await getObjectData("messageLog")) as Message[]) || [];
            const name = (await getStringData("name")) as string;
            const days = await calculateDaysPassed();

            if (start) {
                setStartDate(formatDate(start, false));
            }

            setMessages(messageLog);
            setConversationCount(messageLog.length);
            setName(name);
            setDaysPassed(days);
        };

        loadData();
    }, []);

    const handleCopyMessages = async () => {
        if (messages.length === 0) {
            Alert.alert("알림", "복사할 메시지가 없습니다.");
            return;
        }

        let messageText = messages
            .map((msg, index) => `${index + 1}. ${msg.text}`)
            .join("\n");

        messageText =
            "친구가 키운 비난양파 " +
            name +
            "의 메시지가 도착했습니다.\n" +
            messageText;

        await Clipboard.setStringAsync(messageText);
        Alert.alert("알림", "모든 메시지가 클립보드에 복사되었습니다.");
    };

    const handleRestart = async () => {
        await clearAllData();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <AutoHeightImage
                    source={onionHarvest as any}
                    width={100}
                    style={styles.headerImage}
                />
                <Text style={styles.title}>양파가 완성되었습니다</Text>
                <Text style={styles.subtitle}>
                    {name}
                    {getKoreanParticle(name)} {daysPassed}일 만에 충분히
                    성장했습니다
                </Text>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.statsContainer}>
                    <Text style={styles.statsTitle}>양파의 성장 기록</Text>
                    <Text style={styles.statsText}>
                        • 처음 심은 날: {startDate}
                    </Text>
                    <Text style={styles.statsText}>
                        • 수확한 날: {formatDate(new Date(), false)}
                    </Text>
                    <Text style={styles.statsText}>
                        • 총 대화 횟수: {conversationCount}회
                    </Text>
                </View>

                {messages.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            대화 기록이 없습니다
                        </Text>
                    </View>
                ) : (
                    messages.map((message, index) => (
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
                <TouchableOpacity
                    style={styles.copyButton}
                    onPress={handleCopyMessages}
                >
                    <Text style={styles.copyButtonText}>
                        모든 메시지 복사하기
                    </Text>
                </TouchableOpacity>
                <NavigateBtn
                    navigation={navigation}
                    screenName="Onboarding"
                    style={styles.restartButton}
                    text="다시 시작하기"
                    textStyle={styles.restartButtonText}
                    onPress={handleRestart}
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
    copyButton: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    copyButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
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
        color: "rgb(78, 102, 74)",
        fontSize: 16,
        fontWeight: "600",
    },
    statsContainer: {
        marginBottom: 20,
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: 5,
    },
    statsText: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 14,
    },
});
