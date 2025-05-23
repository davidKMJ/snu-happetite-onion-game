import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useState } from "react";
import { storeStringData } from "../utils/asyncUtils";
import { storeStartingDate } from "../utils/dateUtils";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Platform,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import onion0 from "../assets/onion0.png";

type OnboardingProps = StackScreenProps<RootStackParamList, "Onboarding">;

export const Onboarding = ({ navigation }: OnboardingProps) => {
    const [name, setName] = useState("");

    const handleConfirm = async () => {
        if (name.trim()) {
            await storeStringData("name", name);
            await storeStartingDate();
            await storeStringData("currentGrowth", "0");
            await storeStringData("level", "0");
            await storeStringData("lastScreenName", "Main");
            navigation.replace("Main", { name });
        }
    };
    const { width: imgWidth, height: imgHeight } = Image.resolveAssetSource(onion0);
    const aspectRatio = imgHeight / imgWidth;
    const height = 200 * aspectRatio;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={20} style={styles.content}>
                <Image
                    source={onion0}
                    style={{ width: 200, height: height, marginBottom: 30 }}
                />
                <Text style={styles.title}>비난양파 키우기</Text>
                <Text style={styles.subtitle}>
                    당신의 양파에게 말을 걸어보세요
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="이름을 입력하세요"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={name}
                    onChangeText={setName}
                    maxLength={10}
                />
                <TouchableOpacity
                    style={[
                        styles.button,
                        !name.trim() && styles.buttonDisabled,
                    ]}
                    onPress={handleConfirm}
                    disabled={!name.trim()}
                >
                    <Text style={styles.buttonText}>시작하기</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(78, 102, 74)",
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Platform.OS === "ios" ? 0 : 40,
        paddingHorizontal: 20,
    },
    image: {
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        color: "rgba(255, 255, 255, 0.8)",
        marginBottom: 40,
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 25,
        paddingHorizontal: 20,
        color: "white",
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 25,
        justifyContent: "center",
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
    buttonDisabled: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    buttonText: {
        color: "rgb(78, 102, 74)",
        fontSize: 18,
        fontWeight: "600",
    },
});
