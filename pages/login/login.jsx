import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';

import globalStyles from '../../styles/globalStyles.js'
import Botao from '../../components/botao/botao';
import LogoFacilita from '../../components/logoFacilita/logoFacilita.jsx';
import ReturnArrow from '../../components/returnArrow/returnArrow.jsx';

function Login({ navigation }){
    return (
    <View style={globalStyles.container}>
      <ReturnArrow navigation={navigation}/>
      <View style={globalStyles.content}>
        <LogoFacilita />
            <StatusBar style="light" />
            <View style={[globalStyles.inputBox, {height: '20%'}]}>
                  <TextInput
                  style={globalStyles.input}
                  placeholder="Matrícula"
                  placeholderTextColor="#f5f5f5"
                  />
                  <TextInput
                  style={globalStyles.input}
                  placeholder="Senha"
                  placeholderTextColor="#f5f5f5"
                  />
                  <Text
                    onPress={() => navigation.navigate('EnviarEmail')}
                    style={{ color: '#E8E8E8', fontSize: 12, padding: 5 }}
                  >Esqueci minha senha</Text>
            </View>
            <View style={globalStyles.caixaBtn}>
                  <Botao>Entrar</Botao>
                  {/* Colocar um onPress com caminho da pagina inicial (cardápio) */}
                  
                  <Botao 
                    onPress={() => navigation.navigate('Cadastro')}
                  >
                    Cadastrar
                  </Botao>
          </View>
      </View>

    </View>    
      );
    }

    
export default Login