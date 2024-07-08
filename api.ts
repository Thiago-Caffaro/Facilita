import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource'; // Caminho do arquivo do esquema criado

const client = generateClient<Schema>({
  authMode: 'userPool',
});
export default async function Teste(choice: number) {
  const input = {
    content: "Mensagem Teste",
    sender: "O Sender",
    receiver: "O Receiver",
  };
  try {
    if (choice === 1) {
      const response = await client.graphql({
        query: `mutation createChat($input: CreateChatInput!) {
          createChat(input: $input) {
            id
            content
            sender
            receiver
            createdAt
          }
        }`,
        variables: { input },
      });
      console.log("Response:", response)
    }
    else if (choice === 2) {
      const response = await client.models.Chat.list();
      console.log("Response:", response)
      return response.data[0].content
    }
  } catch (err){
    console.error(err);
  }
  
}

// Aqui estou importando o Schema criado no amplify/data/resource.ts e passando para o client para a criação do dataClient
