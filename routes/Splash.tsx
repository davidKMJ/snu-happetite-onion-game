import { useEffect } from "react";
import { getStringData, storeStringData } from "../utils/asyncUtils";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { Icon } from "../components/Icon";
import { View } from "react-native";

type SplashProps = StackScreenProps<RootStackParamList, "Splash">;

export const Splash = ({ route, navigation }: SplashProps) => {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const lastScreenName = ((await getStringData("lastScreenName")) ||
        "Onboarding") as keyof RootStackParamList;
      if (lastScreenName === "Main") {
        const name = (await getStringData("name")) as string;
        navigation.replace("Main", { name: name });
      } else if (lastScreenName === "DeathAnimation") {
        const deathMessage = (await getStringData("deathMessage")) || undefined;
        navigation.replace("DeathAnimation", { deathMessage });
      } else {
        storeStringData("lastScreenName", lastScreenName);
        navigation.replace(lastScreenName);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(78, 102, 74)",
      }}
    >
      <Icon />
    </View>
  );
};
