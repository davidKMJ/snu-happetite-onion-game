import { TextInput ,Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Icon = () => {
    return (
        <View>
            <Image source={require('../assets/icon.png')} 
            style={{width : 200, height : 200, marginBottom : 10}}/>
        </View>
    )
}