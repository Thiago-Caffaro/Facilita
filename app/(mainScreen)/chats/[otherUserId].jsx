import { View, Text, TouchableOpacity } from 'react-native';
import requerirAlunoData from '@/hooks/requerirDados';
import SendMessage, { client } from '@/api'; // Certifique-se de que o client está configurado corretamente para o AWS AppSync
import { useLocalSearchParams } from 'expo-router';
import globalStyles from '@/styles/globalStyles';
import { useEffect, useState } from 'react';

const privateChat = () => {
  const { otherUserId } = useLocalSearchParams();
  const [userId, setUserId] = useState("");
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const getLocalUserId = async () => {
      setUserId(await requerirAlunoData("id"));
    };
    getLocalUserId();
  }, []);

  useEffect(() => {
    const getPrivateConversation = async () => {
      if (userId || otherUserId) {
        try {
          console.log(otherUserId, userId);
          const response = await client.graphql({
            query: `
              query listChats($senderId: ID!, $receiverId: ID!) {
                listChats(senderId: $senderId, receiverId: $receiverId) {
                  items {
                    id
                    content
                    senderId
                    receiverId
                    senderName
                    receiverName
                    createdAt
                    updatedAt
                  }
                }
              }
            `,
            variables: {
              senderId: userId,
              receiverId: otherUserId,
            },
          });
          console.log("Response:", response);
          if (response.data.listChats && response.data.listChats.items) {
            setConversation(response.data.listChats.items);
          } else {
            setConversation([]);
          }
        } catch (err) {
          console.error(err);
        }
      }; // Aguarda até que os IDs estejam prontos

      
    };
    getPrivateConversation();
  }, [userId, otherUserId]);

  const messageData = {
    content: "teste 2",
    senderId: userId,
    receiverId: otherUserId,
    senderName: "Thiago Caffaro Lima",
    receiverName: "Pedro Henrique",
  };
  return (
    <View>
      <Text >De {userId}</Text>
      <Text >Para {otherUserId}</Text>
      <TouchableOpacity onPress={() => SendMessage(messageData)}>
        <Text>SendMessage</Text>
      </TouchableOpacity>
      <View>
        {conversation.length > 0 ? (
          conversation.map(chat => (
            <Text key={chat.id} style={{marginBottom: 10 }}>
              {`
                De: ${chat.senderName}
                Para: ${chat.receiverName}
                Conteudo: ${chat.content}
              `}
              
            </Text>
          ))
        ) : (
          <Text style={{ color: '#fff' }}>Carregando...</Text>
        )}
      </View>
    </View>
  );
};

export default privateChat;
