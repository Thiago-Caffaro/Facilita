import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';

import globalStyles from '../../../../styles/globalStyles.js'
import recorveryStyles from '../../../../styles/recorveryStyles.js';

import Botao from '../../../../components/botao/botao';
import LogoFacilita from '../../../../components/logoFacilita/logoFacilita.jsx';


function EnviarCod({navigation}){
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
              />
          </View>
          <View style={globalStyles.caixaBtn}>
              <Botao onPress={() => navigation.navigate('NovaSenha')}
              >Confirmar</Botao>
          </View>
      </View>
    </View>
  );
}

export default EnviarCod;