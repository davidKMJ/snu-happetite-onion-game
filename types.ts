export interface NavigationProps {
    navigation: any;
    screenName: string;
    params?: any;
    onPress?: () => Promise<void>;
}

export type RootStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
    Main: { name: string };
    ChatLog: undefined;
    DeathAnimation: undefined;
    Death: undefined;
    Harvest: undefined;
    HarvestAnimation: undefined;
};

export type Message = {
    text: string;
    growth: number;
    date: Date;
}