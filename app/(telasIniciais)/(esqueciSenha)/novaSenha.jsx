import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';
import { useState, useContext } from 'react';

import globalStyles from '@/styles/globalStyles.js'
import recorveryStyles from '@/styles/recorveryStyles.js';

import Botao from '@/components/botao/botao';
import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';

import useNewPassword from '@/hooks/useNewPassword';

import { AuthContext } from '@/context/auth'
import { router } from 'expo-router';

function NovaSenha(){
  const [senha, setSenha] = useState('');
  const [cSenha, setCSenha] = useState('');
  const { tempPassword, hasAlert, alertType  } = useContext(AuthContext);
  const newPassword = useNewPassword();
  const verificarCamposPreenchidos = () => {
    return senha != '' && cSenha != '' && senha == cSenha;
  };
  const handleAlterarSenha = async () =>{
    const result = await newPassword(tempPassword, senha);
    if (result == "SUCCESS") {
      router.push("redirectSenha");
    }
    
  }
  return (
    <View style={recorveryStyles.container}>
      <View id='errorDialog' style={{ zIndex: 10, position: 'absolute', bottom: 0, left: 0}}>
        {hasAlert && alertType}
      </View>
      <View style={recorveryStyles.content}>
          <LogoFacilita tamanho={50} />
          <StatusBar style="light" />
          <Text style={[recorveryStyles.hint, , globalStyles.text]} >
              Digite sua nova senha.
          </Text>
          <View style={[globalStyles.inputBox, {height: '30%'}]}>
              <TextInput
                  style={globalStyles.input}
                  placeholder="Nova senha"
                  placeholderTextColor="#f5f5f5"
                  value={senha}
                  onChangeText={setSenha}
              />
              <TextInput
                  style={globalStyles.input}
                  placeholder="Repita sua nova senha"
                  placeholderTextColor="#f5f5f5"
                  value={cSenha}
                  onChangeText={setCSenha}
              />
          </View>
          <View style={globalStyles.caixaBtn}>
              <Botao 
                disabled={!verificarCamposPreenchidos()}
                onPress={() => handleAlterarSenha()}
              >
                Redefinir
              </Botao>
          </View>
          <Text 
            style={[recorveryStyles.prosseguir, globalStyles.text]}
          >
            Não quero redefinir, apenas prosseguir.
          </Text>
      </View>
    </View>
  );
}

export default NovaSenha;