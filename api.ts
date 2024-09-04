import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource'; // Caminho do arquivo do esquema criado

const client = generateClient<Schema>({
  authMode: 'userPool',
});
export { client };
export default async function SendMessage(messageData: {
  content: string,
  senderId: string,
  receiverId: string,
  senderName: string,
  receiverName: string,
}) {
  const input = {
    content: messageData.content,
    senderId: messageData.senderId,
    receiverId: messageData.receiverId ,
    senderName: messageData.senderName,
    receiverName: messageData.receiverName
  };
  try {
    const response = await client.graphql({
      query: `mutation createChat($input: CreateChatInput!) {
        createChat(input: $input) {
          id
          content
          senderId
          receiverId
          senderName
          receiverName
          createdAt
        }
      }`,
      variables: { input },
    });
    console.log("Response:", response)
    } catch (err){
      console.error(err);
    }
}

// Aqui estou importando o Schema criado no amplify/data/resource.ts e passando para o client para a criação do dataClient
// const response = await client.models.Chat.list();