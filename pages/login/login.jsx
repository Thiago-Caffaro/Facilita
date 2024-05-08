import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';
import axios from 'axios';
import { useState, useContext } from 'react';

import globalStyles from '../../styles/globalStyles.js'
import Botao from '../../components/botao/botao';
import LogoFacilita from '../../components/logoFacilita/logoFacilita.jsx';
import ReturnArrow from '../../components/returnArrow/returnArrow.jsx';

import { AuthContext } from '../../context/auth.js'

function Login({ navigation }){
    const [senha, setSenha] = useState('');
    const { matricula, setMatricula } = useContext(AuthContext);

    const handleLogin = async (matricula, senha) => {
      try {
        const response = await axios.post('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/login', {
          matricula,
          senha,
        });
        // Verifique a resposta do servidor e realize a validação do login.
        if (response.data.success) {
          // Login bem-sucedido
          console.log('Usuário autenticado.');
          navigation.navigate('Cardapio');
        } else {
          // Login falhou
          console.error('Erro de autenticação:', response.data.message);
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    };

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
                  value={matricula}
									onChangeText={setMatricula}
                  />
                  <TextInput
                  style={globalStyles.input}
                  placeholder="Senha"
                  placeholderTextColor="#f5f5f5"
                  value={senha}
									onChangeText={setSenha}
                  />
                  <Text
                    onPress={() => navigation.navigate('EnviarEmail')}
                    style={{ color: '#E8E8E8', fontSize: 12, padding: 5 }}
                  >Esqueci minha senha</Text>
            </View>
            <View style={globalStyles.caixaBtn}>
                  <Botao
                    onPress={() => handleLogin(matricula, senha)}
                    
                  >Entrar</Botao>
                  
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