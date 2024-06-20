import { confirmResetPassword } from 'aws-amplify/auth';
import { signIn as amplifySignIn } from '@aws-amplify/auth';

import { useContext } from 'react';
import { AuthContext } from '@/context/auth'
import useInfoBox from '@/hooks/alertDialog/infoBox';
function useConfirmCode() {
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
        return "SUCCESS";
      } catch(error:any){
        setHasAlert(true);
        console.log(error);
        setAlertType(infoBox(error.name));
      }
    }
}


export default useConfirmCode;