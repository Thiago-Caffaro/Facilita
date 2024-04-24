import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';
import { useState } from 'react';

import globalStyles from '../../../styles/globalStyles.js'
import recorveryStyles from '../../../styles/recorveryStyles.js';

import Botao from '../../../components/botao/botao';
import LogoFacilita from '../../../components/logoFacilita/logoFacilita.jsx';


function NovaSenha({navigation}){
  const [senha, setSenha] = useState('');
  const [cSenha, setCSenha] = useState('');

  const verificarCamposPreenchidos = () => {
    return senha != '' && cSenha != '' && senha == cSenha;
  };

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
                onPress={() => navigation.navigate('NovaSenhaSuccess')}
              >
                Redefinir
              </Botao>
          </View>
          <Text 
            style={[recorveryStyles.prosseguir, globalStyles.text]}
          >
            {/* Colocar um onPress com caminho da pagina inicial (cardápio) */}
            Não quero redefinir, apenas prosseguir.
          </Text>
      </View>
    </View>
  );
}

export default NovaSenha;