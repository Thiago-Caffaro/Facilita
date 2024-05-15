import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';
import { useState, useContext } from 'react';

import globalStyles from '../../../../styles/globalStyles.js'
import recorveryStyles from '../../../../styles/recorveryStyles.js';

import Botao from '../../../../components/botao/botao';
import LogoFacilita from '../../../../components/logoFacilita/logoFacilita.jsx';

import { AuthContext } from '../../../../context/auth.js'

function NovaSenha({navigation}){
  const { matricula } = useContext(AuthContext);
  const [senha, setSenha] = useState('');
  const [cSenha, setCSenha] = useState('');

  const verificarCamposPreenchidos = () => {
    return senha != '' && cSenha != '' && senha == cSenha;
  };
  const handleAlterarSenha = async (change) =>{
    if(change){
      await fetch('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/enviarEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                matricula: matricula
            }),
        });
        navigation.navigate('NovaSenhaSuccess')
    } else{
      navigation.navigate('NovaSenhaSuccess')
    }
  }
  return (
    <View style={recorveryStyles.container}>
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
                onPress={() => handleAlterarSenha(true)}
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