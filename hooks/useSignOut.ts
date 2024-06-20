import { signOut as amplifySignOut } from '@aws-amplify/auth';
import { router } from 'expo-router';

export default function useSignOut(){
  async function signOut() {
    try {
      await amplifySignOut()
      .then(() => {
        alert('Usuário desconectado.');
        router.push("(telasIniciais)/login");
      });
    } catch (error) {
        alert(`Erro ao fazer sair!\n${error}`);
        console.log('Erro ao fazer signOut: ', error);
    }
    }
    return signOut;
}
  


