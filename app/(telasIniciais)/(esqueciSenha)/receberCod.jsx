import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';
import { useContext } from 'react';
import { resetPassword } from 'aws-amplify/auth';

import globalStyles from '@/styles/globalStyles.js'
import recorveryStyles from '@/styles/recorveryStyles.js';

import Botao from '@/components/botao/botao.jsx';
import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';
import SetaSuperior from '@/components/setaSuperior/setaSuperior';

import { AuthContext } from '@/context/auth'
import { router } from 'expo-router';

function ReceberCod(){
  const { email, setEmail } = useContext(AuthContext);

  const handleEmail = async () => {
    const output = await resetPassword({
      username: email
    });
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
        alert(
          `Código de verificação enviado para ${email}`
        );
        router.push('enviarCod');
        break;
      case 'DONE':
        console.log('Successfully reset password.');
        break;
    }
  }
  
  return (
    <View style={recorveryStyles.container}>
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
              />
          </View>
          <View style={globalStyles.caixaBtn}>
              <Botao onPress={() => handleEmail()}
              >Confirmar</Botao>
          </View>
      </View>
    </View>
  );
}

export default ReceberCod;