import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';
import { useContext } from 'react';
import { resetPassword } from '@/services/auth';

import globalStyles from '@/styles/globalStyles.js'
import recorveryStyles from '@/styles/recorveryStyles.js';

import Botao from '@/components/botao/botao.jsx';
import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';
import SetaSuperior from '@/components/setaSuperior/setaSuperior';
import AvisoDemo from '@/components/avisoDemo/avisoDemo.jsx';
import useInfoBox from '@/hooks/alertDialog/infoBox';

import { AuthContext } from '@/context/auth'
import { contaDemo } from '@/services/demo/dados';
import { router } from 'expo-router';

function ReceberCod(){
  const { email, setEmail, hasAlert, alertType, setHasAlert, setAlertType } = useContext(AuthContext);
  const infoBox = useInfoBox();

  const handleEmail = async () => {
    try {
      const output = await resetPassword({
        username: email
      });
      const { nextStep } = output;
      switch (nextStep.resetPasswordStep) {
        case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
          alert(
            `Código de verificação enviado para ${email}`
          );
          router.push('/enviarCod');
          break;
        case 'DONE':
          console.log('Successfully reset password.');
          break;
      }
    } catch (error) {
      setHasAlert(true);
      console.log(error);
      setAlertType(infoBox(error.name));
    }
  }

  return (
    <View style={recorveryStyles.container}>
      <View id='errorDialog' style={{ zIndex: 10, position: 'absolute', bottom: 0, left: 0}}>
        {hasAlert && alertType}
      </View>
      <SetaSuperior />
      <View style={recorveryStyles.content}>
          <LogoFacilita tamanho={50} />
          <StatusBar style="light" />
          <Text style={[recorveryStyles.hint, globalStyles.text]} >
              Digite seu email e clique para enviarmos um código de recuperação de senha para você
          </Text>
          <View style={globalStyles.inputBox}>
              <TextInput
                  style={globalStyles.input}
                  placeholder="Email"
                  placeholderTextColor="#f5f5f5"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
              />
          </View>
          <View style={globalStyles.caixaBtn}>
              <Botao onPress={() => handleEmail()}
              >Confirmar</Botao>
          </View>
      </View>
      <AvisoDemo>Use {contaDemo.email} ou o email de uma conta que você criou.</AvisoDemo>
    </View>
  );
}

export default ReceberCod;
