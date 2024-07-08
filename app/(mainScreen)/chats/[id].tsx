import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ChatComponent from '@/components/chat/chatComponent';
import { useLocalSearchParams } from 'expo-router';

const privateChat = () => {
    const { id } = useLocalSearchParams();
    return (
        <View >      
            <Text>{id}</Text>
        </View>
    );
};
export default privateChat;