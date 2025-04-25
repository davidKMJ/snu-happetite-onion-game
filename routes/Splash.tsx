import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { getStringData } from "../utils/asyncUtils";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { Icon } from "../components/Icon";

type SplashProps = StackScreenProps<RootStackParamList, "Splash">;

export const Splash = ({ route, navigation }: SplashProps) => {
    useEffect(() => {
        const timer = setTimeout(async () => {
            const lastScreenName = ((await getStringData("lastScreenName")) ||
                "Onboarding") as keyof RootStackParamList;
            if (lastScreenName === "Main") {
                const name = (await getStringData("name")) as string;
                navigation.navigate("Main", { name: name });
            } else {
                navigation.navigate(lastScreenName);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return <Icon />;
};
