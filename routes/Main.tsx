import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  LogBox,
  Dimensions,
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
LogBox.ignoreAllLogs();
import { OnionImages } from "../components/Onion";
import { calculateDaysPassed } from "../utils/dateUtils";
import { useEffect, useState } from "react";
import NavigationBtn from "../components/Button";
import { ApiResponse, Message, RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import {
  clearAllData,
  getObjectData,
  getStringData,
  storeObjectData,
  storeStringData,
} from "../utils/asyncUtils";
import { MessageModal } from "../components/Modal";
import { analyzeNewMessage } from "../utils/apiUtils";
import { OnionSpeechModal } from "../components/OnionSpeechModal";

const GROWTH_THRESHOLDS = {
  MAX: 20,
  LEVEL1: 2,
  LEVEL2: 5,
  LEVEL3: 8,
  LEVEL4: 12,
  LEVEL5: 16,
} as const;

type MainProps = StackScreenProps<RootStackParamList, "Main">;

export const Main = ({ route, navigation }: MainProps) => {
  const { name } = route.params;
  const [daysPassed, setDaysPassed] = useState(0);
  const [text, setText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSpeechBubbleVisible, setSpeechBubbleVisible] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse>({ score: 0 });
  const [level, setLevel] = useState(0);
  const [onionImage, setOnionImage] = useState(OnionImages.GetImage(`onion0`));

  const updateOnionImage = async () => {
    const lv = await getStringData("level");
    const newLevel = lv ? parseInt(lv) : 0;
    setLevel(newLevel);
    setOnionImage(OnionImages.GetImage(`onion${newLevel}`));
  };

  useEffect(() => {
    const calculateDays = async () => {
      const days = await calculateDaysPassed();
      setDaysPassed(days);
      await updateOnionImage();
    };
    calculateDays();
  }, []);

  useEffect(() => {
    updateOnionImage();
  }, [level]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(false);
      setText("");
      setSpeechBubbleVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isModalVisible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpeechBubbleVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isSpeechBubbleVisible]);

  const onPress = async () => {
    if (!text) {
      console.log("Please enter a message before sending.");
      return;
    }

    const messageLog = (await getObjectData("messageLog")) || ([] as Message[]);
    const apiResponse = (await analyzeNewMessage(text)) as ApiResponse;
    const newMessage = {
      text,
      growth: apiResponse.score,
      date: new Date(),
    };

    setApiResponse(apiResponse);
    messageLog.push(newMessage);
    await storeObjectData("messageLog", messageLog);

    const currentGrowth = parseFloat(
      (await getStringData("currentGrowth")) || "0"
    );
    const totalGrowth = currentGrowth + newMessage.growth;
    setModalVisible(true);

    if (totalGrowth > GROWTH_THRESHOLDS.MAX) {
      await storeStringData("lastScreenName", "HarvestAnimation");
      navigation.replace("HarvestAnimation");
    } else if (newMessage.growth < 0) {
      await storeStringData("lastScreenName", "DeathAnimation");
      navigation.replace("DeathAnimation", {
        deathMessage: apiResponse.reason,
      });
    } else {
      await storeStringData("currentGrowth", totalGrowth.toString());

      if (totalGrowth >= GROWTH_THRESHOLDS.LEVEL5) {
        setLevel(5);
        await storeStringData("level", "5");
      } else if (totalGrowth >= GROWTH_THRESHOLDS.LEVEL4) {
        setLevel(4);
        await storeStringData("level", "4");
      } else if (totalGrowth >= GROWTH_THRESHOLDS.LEVEL3) {
        setLevel(3);
        await storeStringData("level", "3");
      } else if (totalGrowth >= GROWTH_THRESHOLDS.LEVEL2) {
        setLevel(2);
        await storeStringData("level", "2");
      } else if (totalGrowth >= GROWTH_THRESHOLDS.LEVEL1) {
        setLevel(1);
        await storeStringData("level", "1");
      }
    }
  };
  const screenWidth = Dimensions.get("window").width;
  const { width: imgWidth, height: imgHeight } =
    Image.resolveAssetSource(onionImage);
  const aspectRatio = imgHeight / imgWidth;
  const height = screenWidth * 0.5 * aspectRatio;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            <Text style={styles.titleBoldText}>비난양파 </Text>
            키우기
          </Text>
          <Text style={styles.daysText}>D+{daysPassed}</Text>
        </View>
        <TouchableOpacity
          style={styles.debugButton}
          onPress={() => {
            clearAllData();
            storeStringData("lastScreenName", "Onboarding");
            navigation.replace("Onboarding");
          }}
        >
          <Text style={styles.debugButtonText}>초기화</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.onionContainer}>
          <Image
            source={onionImage}
            style={{
              width: screenWidth * 0.5,
              height: height,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.15,
              shadowRadius: 8,
            }}
          />
          <Text style={styles.nameText}>{name}</Text>
        </View>

        <MessageModal
          isVisible={isModalVisible}
          message={text}
          style={styles.messageModal}
        />
        <OnionSpeechModal isVisible={isSpeechBubbleVisible} />

        <KeyboardAvoidingView
          style={styles.bottomContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={200}
        >
          <NavigationBtn
            navigation={navigation}
            screenName="ChatLog"
            text="채팅 로그"
            style={styles.chatLogButton}
            textStyle={styles.chatLogButtonText}
          />

          <Text style={styles.inputLabel}>
            양파에게 하고 싶은 말을 써보세요
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="양파에게 욕하기"
              placeholderTextColor="rgba(78, 102, 74, 0.5)"
              onChangeText={setText}
              value={text}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !text.trim() && styles.sendButtonDisabled,
              ]}
              onPress={onPress}
              disabled={!text.trim()}
            >
              <Text style={styles.sendButtonText}>↑</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  messageModal: {
    position: "absolute",
    top: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 40,
    paddingBottom: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(78, 102, 74, 0.1)",
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 28,
    color: "#333",
  },
  titleBoldText: {
    fontWeight: "700",
    color: "rgb(78, 102, 74)",
  },
  daysText: {
    fontSize: 22,
    color: "rgb(78, 102, 74)",
    marginTop: 8,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  onionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "60%",
  },
  onionImage: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  nameText: {
    fontSize: 20,
    color: "#666",
    fontWeight: "500",
  },
  bottomContainer: {
    paddingBottom: 20,
  },
  chatLogButton: {
    alignSelf: "center",
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "rgb(78, 102, 74)",
    borderWidth: 1.5,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  chatLogButtonText: {
    color: "rgb(78, 102, 74)",
    fontSize: 15,
    fontWeight: "600",
  },
  inputLabel: {
    textAlign: "center",
    marginBottom: 10,
    color: "#666",
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(78, 102, 74, 0.2)",
  },
  textInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    color: "#333",
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgb(78, 102, 74)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: "rgba(78, 102, 74, 0.5)",
  },
  sendButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  debugButton: {
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  debugButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
});
