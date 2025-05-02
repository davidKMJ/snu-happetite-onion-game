import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { View, Image } from "react-native";

type DeathProps = StackScreenProps<RootStackParamList, "Death">;

export const Death = ({ route, navigation }: DeathProps) => {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgb(238, 161, 138)" }}>
        <Image
            source={require("../assets/onion_death.png")}
            style={{ width: 200, height: 200, marginBottom: 10, alignSelf: 'center', position: 'absolute', bottom: '40%' }}
        />
    </View>;
};
