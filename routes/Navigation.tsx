import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Splash } from "./Splash";
import { Onboarding } from "./Onboarding";
import { Main } from "./Main";
import { ChatLog } from "./ChatLog";
import { RootStackParamList } from "../types";
import { DeathAnimation } from "./DeathAnimation";
import { Death } from "./Death";
import { Harvest } from "./Harvest";
import { HarvestAnimation } from "./HarvestAnimation";

const Stack = createStackNavigator<RootStackParamList>();

const StackScreen = () => {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="ChatLog" component={ChatLog} />
            <Stack.Screen name="Death" component={Death} />
            <Stack.Screen name="DeathAnimation" component={DeathAnimation} />
            <Stack.Screen name="Harvest" component={Harvest} />
            <Stack.Screen
                name="HarvestAnimation"
                component={HarvestAnimation}
            />
        </Stack.Navigator>
    );
};

const Navigation = () => {
    return (
        <NavigationContainer>
            <StackScreen />
        </NavigationContainer>
    );
};

export default Navigation;
