import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeStringData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log(`Stored string data: ${key} = ${value}`);
    } catch (e) {
        console.error('Error storing string data', e);
    }
}

export const storeObjectData = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error('Error storing data', e);
    }
}

export const getStringData = async (key: string) => {
    try {
        const stringValue = await AsyncStorage.getItem(key);
        return stringValue !== null ? stringValue : null;
    } catch (e) {
        console.error('Error retrieving string data', e);
    }
}

export const getObjectData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Error retrieving data', e);
    }
}

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error('Error removing data', e);
    }
}

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.error('Error clearing all data', e);
    }
}