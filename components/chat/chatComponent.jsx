import { useEffect, useState } from 'react';
import Teste from '@/api'
import { View, Text, TouchableOpacity } from 'react-native';

function ChatComponent() {
  const [message, setMessage] = useState('');
  function handleTeste(choice) {
      const a = Teste(choice);
      setMessage(a);
  }
  
  
  return (
    <View>
      <TouchableOpacity onPress={() => {handleTeste(1)}}>
        <Text>Send Test</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {handleTeste(2)}}>
        <Text>Fetch Test</Text>
      </TouchableOpacity>
      <Text>Test text: {message} </Text>
    </View>
  );
}
export default ChatComponent;