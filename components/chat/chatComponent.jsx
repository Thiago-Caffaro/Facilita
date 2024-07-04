import { useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import fetchChats from '@/api';

import { View, Text, TouchableOpacity } from 'react-native';

function ChatComponent() {
    
  return (
    <View>
      <TouchableOpacity onPress={() => {fetchChats()}}>
        <Text>Fetch Chats</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatComponent;