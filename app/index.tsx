import { router } from 'expo-router';
import { getCurrentUser, fetchUserAttributes } from '@/services/auth';
import { useEffect } from "react";

import Carregamento from '@/components/carregamento/carregamento';

export default function LoadAndCheckUser() {

  const checkUser = async () =>{
    // Checa se o usuário está logado, caso esteja, redireciona para a tela principal
    try {
      const { signInDetails } = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      console.log("Detalhes do login:", signInDetails);
      if (attributes["custom:hasCompletedSingup"] == "incompleto"){
        router.replace("/login");
        alert("Por favor, faça a alteração da senha");
      } else {
        router.replace("/main");
      }
    } catch(error: any){
      if(error.name == "UserUnAuthenticatedException" || error.name == "UserNotFoundException"){
        router.replace("/login");
      } else {
        console.log(error);
      }
    }

  }
  // Aqui chamo a função que checa se o usuário está logado uma vez quando o app abre
  useEffect(() => {
    checkUser();
  }, []);

  return <Carregamento />;
}
