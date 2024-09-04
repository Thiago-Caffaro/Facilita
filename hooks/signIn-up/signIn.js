import { signIn as amplifySignIn } from '@aws-amplify/auth';
import { router } from 'expo-router';
import { fetchUserAttributes  } from 'aws-amplify/auth';
import { AuthContext } from '@/context/auth'
import { useContext } from 'react';

import resendConfirmationCode from '@/scripts/resendSignInCode';
import useInfoBox from '@/hooks/alertDialog/infoBox';
// Essa função faz o processo de logIn do usuário, e redireciona ele para a tela principal se o login for bem sucedido
// Caso algum erro ocorra, ele retorna esse erro
export default function useSignIn(){
  const { setHasAlert, setAlertType } = useContext(AuthContext);
  const infoBox = useInfoBox();

  async function signIn(email, senha) {
    try {
      await amplifySignIn({
          username: email,
          password:  senha,
          options: {
            authFlowType: 'USER_PASSWORD_AUTH'
          }
      })
      console.log('Usuário loggado!');

      const attributes = await fetchUserAttributes();
      
      if (attributes["custom:hasCompletedSingup"] == "incompleto"){
        alert("Por favor, faça a alteração da senha");
      }else if(attributes["custom:hasCompletedSingup"] == "incompleto" && attributes["email_verified"] == "false"){
        alert("Por favor, confirme seu email");
      } else {
        router.push("(mainScreen)/main");
      }
      
    } catch (error) {
        setHasAlert(true);
        console.log(error);
        setAlertType(infoBox(error.name));
        // Se o erro for a falta de confrimação do email, leva o usuário para a tela de confirmação
        if (error.name == "UserUnAuthenticatedException"){
          console.log("Reenviando código de confirmação de email...");
          resendConfirmationCode(email);
          router.push("(telasIniciais)/confirmarCadastro");
        }
    }
  }
  return signIn;

}
