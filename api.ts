import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource'; // Caminho do arquivo do esquema criado

const client = generateClient<Schema>({
  authMode: 'userPool',
});

// Aqui estou importando o Schema criado no amplify/data/resource.ts e passando para o client para a criação do dataClient
const fetchChats = async () => {
  try {
    return client.models.Chat.list()
 } catch (error) {
   console.error(error);
   return { error: 'Failed to fetch chats' }
 }
};
export default fetchChats