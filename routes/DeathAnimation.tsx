import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { View, Text } from "react-native";
import NavigationBtn from "../components/Button";

type DeathAnimationProps = StackScreenProps<
    RootStackParamList,
    "DeathAnimation"
>;

export const DeathAnimation = ({ route, navigation }: DeathAnimationProps) => {
    const { deathMessage } = route.params;
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>{deathMessage}</Text>
            <NavigationBtn navigation={navigation} screenName="Onboarding" />
        </View>
    );
};
