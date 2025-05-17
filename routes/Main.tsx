import { View, Text, TextInput, TouchableOpacity, LogBox, Dimensions, Image } from "react-native";
LogBox.ignoreAllLogs();
import {StyleSheet} from 'react-native';
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

type MainProps = StackScreenProps<RootStackParamList, "Main">;

export const Main = ({ route, navigation }: MainProps) => {
    const MAX_GROWTH = 20;
    const GROWTH1 = 2;
    const GROWTH2 = 5;
    const GROWTH3 = 8;
    const GROWTH4 = 12;
    const GROWTH5 = 16;
    const { name } = route.params;
    const [daysPassed, setDaysPassed] = useState(0);
    const [text, setText] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse>({ score: 0 });
    const [level, setLevel] = useState(0);
    const [OnionImage, setOnionImage] = useState(OnionImages.GetImage(`onion0`));
    useEffect(() => {
        const calculateDays = async () => {
            const days = await calculateDaysPassed();
            setDaysPassed(days);
            const lv = await getStringData("level");
            if (lv) {
                setLevel(parseInt(lv));
            } else {
                setLevel(0);
            }
            setOnionImage(OnionImages.GetImage(
                `onion${level}`
            ));
        };
        calculateDays();
    }, []);
    useEffect(() => {
        const updateOnionImage = async () => {
            const lv = await getStringData("level");
            if (lv) {
                setLevel(parseInt(lv));
            } else {
                setLevel(0);
            }
            setOnionImage(OnionImages.GetImage(
                `onion${level}`
            ));
        };
        updateOnionImage();
    }, [level]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setModalVisible(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [isModalVisible]);
    const onPress = async () => {
        if (text) {
            const messageLog =
                (await getObjectData("messageLog")) || ([] as Message[]);
            const apiResponse = (await analyzeNewMessage(text)) as ApiResponse;
            const newMessage = {
                text: text,
                growth: apiResponse.score,
                date: new Date(),
            };
            setApiResponse(apiResponse);
            messageLog.push(newMessage);
            await storeObjectData("messageLog", messageLog);
            const currentGrowth = parseFloat(
                (await getStringData("currentGrowth")) || "0"
            );
            if (currentGrowth + newMessage.growth > MAX_GROWTH) {
                navigation.replace("HarvestAnimation");
                await storeStringData('lastScreenName', 'HarvestAnimation');
            } else if (newMessage.growth < 0) {
                navigation.replace("DeathAnimation", {
                    deathMessage: apiResponse.reason,
                });
                await storeStringData('lastScreenName', 'DeathAnimation');
            } else {
                const newGrowth = currentGrowth + newMessage.growth;
                await storeStringData("currentGrowth", newGrowth.toString());
                setModalVisible(true);
                if (newGrowth >= GROWTH1 && newGrowth < GROWTH2) {
                    setLevel(1);
                    await storeStringData("level", "1");
                }
                else if (newGrowth >= GROWTH2 && newGrowth < GROWTH3) {
                    setLevel(2);
                    await storeStringData("level", "2");
                }
                else if (newGrowth >= GROWTH3 && newGrowth < GROWTH4) {
                    setLevel(3);
                    await storeStringData("level", "3");
                }
                else if (newGrowth >= GROWTH4 && newGrowth < GROWTH5) {
                    setLevel(4);
                    await storeStringData("level", "4");
                }
                else if (newGrowth >= GROWTH5) {
                    setLevel(5);
                    await storeStringData("level", "5");
                }
            }
        } else {
            console.log("Please enter a message before sending.");
        }
    };
    const screenWidth = Dimensions.get('window').width;
    const { width: imgWidth, height: imgHeight } = Image.resolveAssetSource(OnionImage);
    const aspectRatio = imgHeight / imgWidth;
    const height = screenWidth * 0.5 * aspectRatio;
    return (
        <View style={{ marginLeft: 20, marginRight: 20, height:'100%' }}>
            <Text style={styles.titleText}>
                <Text style={styles.titleBoldText}>비난양파 </Text>
                키우기
            </Text>
            <Text style={styles.daysText}>D+{daysPassed}</Text>
            <Image
                source={OnionImage}
                style={{ width: screenWidth * 0.5, height: height, alignSelf: 'center', position: 'absolute', bottom: '70%' }}
            />
            <MessageModal isVisible={isModalVisible} message={text} />
            <Text style={styles.nameText}>{name}</Text>
            <NavigationBtn 
                navigation={navigation}
                screenName="ChatLog"
                text="채팅 로그"
                style={{alignSelf: 'center', width: 80, height: 30, justifyContent: 'center', alignItems: 'center', marginTop: 10, borderColor: 'rgb(78, 102, 74)', borderWidth: 1, borderRadius: 15, position: 'absolute', bottom: '30%'}}
                textStyle={{color: 'rgb(78, 102, 74)', fontSize: 15}}
            />
            <Text style={{alignSelf: 'center', marginBottom: '5%', position: 'absolute', bottom:'13%'}}>양파에게 하고 싶은 말을 써보세요</Text>
            <TextInput
                style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 0,
                    width: '80%',
                    backgroundColor: "rgb(78, 102, 74)",
                    borderRadius: 15,
                    paddingLeft: 15,
                    position: "absolute",
                    left: 0,
                    bottom: '10%',
                    color: "white",
                    
                }}
                placeholder="양파에게 욕하기"
                placeholderTextColor={"white"}
                onChangeText={(text) => setText(text)}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 20,
                    position: "absolute",
                    right: 0,
                    width: 40,
                    height: 40,
                    bottom: '10%',
                    paddingTop: 5,
                    borderColor: "rgb(78, 102, 74)",
                    borderWidth: 3,
              
                }}
                onPress={onPress}
            >
                <Text style={{ color: "rgb(78, 102, 74)", fontSize: 20, fontWeight:'bold'}}>↑</Text>
            </TouchableOpacity>
            {/* for debugging purposes only */}
            {/* <TouchableOpacity
                style={{
                    backgroundColor: "blue",
                    padding: 10,
                    borderRadius: 5,
                }}
                onPress={async () => await clearAllData()}
            >
                <Text style={{ color: "white" }}>Purge All Data</Text>
            </TouchableOpacity> */}
        </View>
    );
};


const styles = StyleSheet.create({
    titleText: {
      fontSize: 30,
      marginTop: 30,
      marginBottom: 10,
    },
    titleBoldText: { 
      fontWeight: 'bold',
      color: 'rgb(78, 102, 74)'
    },
    daysText: {
        fontSize: 25,
        color: 'rgb(78, 102, 74)'
    },
    nameText: {
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
        position: 'absolute', 
        bottom: '37%',
        width: '100%',
    },
  });