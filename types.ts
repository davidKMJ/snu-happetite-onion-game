export interface NavigationProps {
    navigation: any;
    screenName: string;
    params?: any;
    onPress?: () => Promise<void>;
}   