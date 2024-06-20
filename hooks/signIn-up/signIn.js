import { signIn as amplifySignIn } from '@aws-amplify/auth';
import { router } from 'expo-router';

import { AuthContext } from '@/context/auth'
import { useContext } from 'react';

import useInfoBox from '@/hooks/alertDialog/infoBox';
// Essa função faz o processo de logIn do usuário, e redireciona ele para a tela principal se o login for bem sucedido
// Caso o usuário já esteja logado, redireciona para a tela principal
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
      router.push("(mainScreen)/main");
    } catch (error) {
      if (error.name == "UserAlreadyAuthenticatedException"){
        console.log("O usuário já está loggado, redirecionando...");
        router.push("(mainScreen)/main");
      } else {
        setHasAlert(true);
        console.log(error);
        setAlertType(infoBox(error.name));
      }
    }
  }
  return signIn;

}
