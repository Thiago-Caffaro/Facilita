import { updatePassword } from '@aws-amplify/auth';

import { AuthContext } from '@/context/auth'
import { useContext } from 'react';

import useInfoBox from '@/hooks/alertDialog/infoBox';
export default function UseNewPssword(){
  const { setHasAlert, setAlertType } = useContext(AuthContext);
  const infoBox = useInfoBox();

  async function newPassword(tempPassword:string, senha:string) {
    try {
      await updatePassword({
          oldPassword: tempPassword,
          newPassword: senha,
      });
      console.log('Senha alterada com sucesso!');
      return 'SUCCESS';
    } catch (error:any) {
        setHasAlert(true);
        console.log(error);
        setAlertType(infoBox(error.name));
    }
  }
  return newPassword;

}
