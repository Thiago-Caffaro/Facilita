import { confirmResetPassword } from 'aws-amplify/auth';
import { signIn as amplifySignIn } from '@aws-amplify/auth';

import { useContext } from 'react';
import { AuthContext } from '@/context/auth'

import useInfoBox from '@/hooks/alertDialog/infoBox';
import useChangeAttribute from '@/hooks/changeAtribute';
function useConfirmCode() {
  const changeAttribute = useChangeAttribute();
  // Ao ser chamada, o email e o code devem ser passados para a função, e então ela irá alterar a senha para o tempPassword e então logar o usuário
  // Também irá alterar o atribruto custom:hasCompletedSingup para "incompleto"

  const { setHasAlert, setAlertType, setTempPassword } = useContext(AuthContext);
  const infoBox = useInfoBox();
  return async function handleConfirmCode(code: string, email:string) {
      const tempPassword = "Temp!" + Math.random().toString(36).slice(-8)
      setTempPassword(tempPassword)
      try {
        await confirmResetPassword({
          username: email,
          confirmationCode: code,
          newPassword: tempPassword
        })
        await amplifySignIn({
          username: email,
          password: tempPassword,
          options: {
            authFlowType: 'USER_PASSWORD_AUTH'
          }
        })
        changeAttribute(email, "custom:hasCompletedSingup", "incompleto"); // Atributo e valor que vai ser alterado
        return "SUCCESS";
      } catch(error:any){
        setHasAlert(true);
        console.log(error);
        setAlertType(infoBox(error.name));
      }
    }
}


export default useConfirmCode;