import { signOut as amplifySignOut } from '@/services/auth';
import { router } from 'expo-router';

export default function useSignOut(){
  async function signOut() {
    try {
      await amplifySignOut();
      router.replace("/login");
    } catch (error) {
        alert(`Erro ao fazer sair!\n${error}`);
        console.log('Erro ao fazer signOut: ', error);
    }
    }
    return signOut;
}
