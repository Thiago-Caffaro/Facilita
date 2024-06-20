import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';
import { useContext } from 'react';

import globalStyles from '@/styles/globalStyles.js'
import recorveryStyles from '@/styles/recorveryStyles.js';

import Botao from '@/components/botao/botao.jsx';
import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';
import useConfirmCode from '@/hooks/useConfirmCode.ts';

import { AuthContext } from '@/context/auth'
import { router } from 'expo-router';

function EnviarCod(){
  const { 
    hasAlert,
    email, 
    alertType, 
    setUserCode, 
    userCode,
  } = useContext(AuthContext);
  const handleConfirmCode = useConfirmCode();

  const handleCode = async () => {
    const result = await handleConfirmCode(userCode, email);
    if (result == "SUCCESS") {
      console.log("O código foi!");
      router.push("novaSenha");
    }
  };
  
  return (
    <View style={recorveryStyles.container}>
      <View id='errorDialog' style={{ zIndex: 10, position: 'absolute', bottom: 0, left: 0}}>
        {hasAlert && alertType}
      </View>
      <View style={recorveryStyles.content}>
          <LogoFacilita tamanho={50} />
          <StatusBar style="light" />
          <Text style={[recorveryStyles.hint, globalStyles.text]} >
              Digite o código recebido para prosseguir.
          </Text>
          <View style={globalStyles.inputBox}>
              <TextInput
                  style={globalStyles.input}
                  placeholder="Código"
                  placeholderTextColor="#f5f5f5"
                  value={userCode}
                  onChangeText={setUserCode}
              />
          </View>
          <View style={globalStyles.caixaBtn}>
              <Botao onPress={() => handleCode()}
              >Confirmar</Botao>
          </View>
      </View>
    </View>
  );
}

export default EnviarCod;