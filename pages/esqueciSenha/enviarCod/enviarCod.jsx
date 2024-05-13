import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';
import { useState, Date } from 'react';
import axios from 'axios';

import globalStyles from '../../../styles/globalStyles.js'
import recorveryStyles from '../../../styles/recorveryStyles.js';

import Botao from '../../../components/botao/botao';
import LogoFacilita from '../../../components/logoFacilita/logoFacilita.jsx';


function EnviarCod({navigation}){
  const [codigo, setCodigo] = useState('');
  let confirmed = false;

  const handleCode = async (codigo) => {
    const response = await axios.post('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/enviarEmail', {
      codigo
    })
    if (codigo == response.codigo){
      confirmed = true;
      navigation.navigate('NovaSenha')
    }
    else {
      confirmed = false;
      alert('Código errado');
    }
  }
  
  return (
    <View style={recorveryStyles.container}>
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
                  value={codigo}
                  onChangeText={setCodigo}
              />
          </View>
          <View style={globalStyles.caixaBtn}>
              <Botao onPress={() => handleCode(codigo)}
              >Confirmar</Botao>
          </View>
      </View>
    </View>
  );
}

export default EnviarCod;