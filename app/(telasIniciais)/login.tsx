import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';
import { useContext, useState } from 'react';
import { router } from 'expo-router';

import globalStyles from '@/styles/globalStyles.js';

import Botao from '@/components/botao/botao.jsx';
import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';

import useSignIn from '@/hooks/signIn-up/signIn.js';

import {AuthContext} from '@/context/auth'
function Login() {
    const { email, setEmail, senha, setSenha, hasAlert, alertType, } = useContext(AuthContext);
    const signIn = useSignIn();
    return (
    <View style={[globalStyles.container, {zIndex: 2}]}>
      <View id='errorDialog' style={{ zIndex: 10, position: 'absolute', bottom: 0, left: 0}}>
        {hasAlert && alertType}
      </View>
      <View style={globalStyles.content}>
        <LogoFacilita tamanho={null} />
            <StatusBar style="light" />
            <View style={[globalStyles.inputBox, {height: '20%'}]}>
                  <TextInput
                  style={globalStyles.input}
                  placeholder="Email"
                  placeholderTextColor="#f5f5f5"
									onChangeText={setEmail}
                  />
                  <TextInput
                  style={globalStyles.input}
                  placeholder="Senha"
                  placeholderTextColor="#f5f5f5"
                  value={senha}
									onChangeText={setSenha}
                  />
                  <Text
                    onPress={() => router.push('(esqueciSenha)/receberCod')}
                    style={{ color: '#E8E8E8', fontSize: 12, padding: 5 }}
                  >Esqueci minha senha</Text>
            </View>
            <View style={globalStyles.caixaBtn}>
                  <Botao 
                    onPress={() => signIn(email, senha)}
                    disabled={false}
                  >
                    Entrar
                  </Botao>
                  
                  <Botao 
                    onPress={() => {router.push("(telasIniciais)/cadastro");}}
                    disabled={false}
                  >
                    Cadastrar
                  </Botao>
          </View>
          </View>
      </View>    
    );
  }
  

   

export default Login