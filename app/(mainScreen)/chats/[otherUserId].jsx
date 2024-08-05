import { View, Text, TouchableOpacity } from 'react-native';
import requerirAlunoData from '@/hooks/requerirDados';
import SendMessage, { client } from '@/api'; // Certifique-se de que o client está configurado corretamente para o AWS AppSync
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const PrivateChat = () => {
  const { otherUserId } = useLocalSearchParams();
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const [nomeAluno, setNomeAluno] = useState("");

  useEffect(() => {
    const getLocalUserId = async () => {
      const alunoData = await requerirAlunoData();
      setNomeAluno(alunoData.nomeAluno);
      setUserId(await requerirAlunoData("id"));
    };
    getLocalUserId();
  }, []);

  useEffect(() => {
    const getPrivateConversation = async () => {
      if (userId && otherUserId) {
        try {
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

          if (response && response.data.listChats && response.data.listChats.items) {
            const giftedChatMessages = response.data.listChats.items.map(chat => {
                  return {
                    _id: chat.id,
                    text: chat.content,
                    createdAt: new Date(chat.createdAt),
                    user: {
                      _id: chat.senderId,
                      name: chat.senderName,
                    },
                }
              }
            );
            console.log(giftedChatMessages)
            setMessages(giftedChatMessages);
          } else {
            console.log("No messages found or error:", response.error);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    getPrivateConversation();
  }, [userId, otherUserId]);

  const handleSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    const messageData = {
      content: newMessages[0].text,
      senderId: userId,
      receiverId: otherUserId,
      senderName: nomeAluno,
      receiverName: "Suporte",
    };
    SendMessage(messageData);
  }, [userId, otherUserId, nomeAluno]);

  return (
    <View style={{ flex: 1 }}>
      
      <GiftedChat
        messages={messages}
        onSend={newMessages => handleSend(newMessages)}
        user={{
          _id: userId,
          name: nomeAluno,
        }}
      />
    </View>
  );
};

export default PrivateChat;
