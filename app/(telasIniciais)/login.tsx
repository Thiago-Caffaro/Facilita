import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { useCallback, useContext, useState } from 'react';
import { router, useFocusEffect } from 'expo-router';

import globalStyles from '@/styles/globalStyles.js';

import Botao from '@/components/botao/botao.jsx';
import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';
import AvisoDemo from '@/components/avisoDemo/avisoDemo.jsx';
import { contaDemo } from '@/services/demo/dados';

import useSignIn from '@/hooks/signIn-up/signIn.js';
import useLimparVariaveisGlobais from '@/hooks/useLimparVariaveisGlobais';

import {AuthContext} from '@/context/auth'
function Login() {
    const hiddenIcon = require('@/assets/icons/olhoSemVer.png');
		const visibleIcon = require('@/assets/icons/olhoVendo.png');

    const [isHidden, setIsHidden] = useState(true);
    const { email, setEmail, senha, setSenha, hasAlert, alertType, } = useContext(AuthContext);

    const signIn = useSignIn();
    const limparVariaveisGlobais = useLimparVariaveisGlobais();

    // Limpa os campos de texto sempre que a tela de login volta a ficar visível
    useFocusEffect(
      useCallback(() => {
        limparVariaveisGlobais();
      }, [])
    );
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
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  />
                  <View style={globalStyles.inputBoxPass}>
                    <TextInput
                      style={globalStyles.input}
                      placeholder="Senha"
                      placeholderTextColor="#f5f5f5"
                      value={senha}
                      onChangeText={setSenha}
                      secureTextEntry={isHidden}
                    />
                    <TouchableOpacity style={globalStyles.eyeStyle} onPress={() => setIsHidden(!isHidden)}>
                      <Image style={globalStyles.eyeImageStyle}
                      source={isHidden ? hiddenIcon : visibleIcon}></Image>
                    </TouchableOpacity>
                  </View>
                  <Text
                    onPress={() => router.push('/receberCod')}
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
                    onPress={() => {router.push("/cadastro");}}
                    disabled={false}
                  >
                    Cadastrar
                  </Botao>
          </View>
          <AvisoDemo
            acao="Preencher com a conta de demonstração"
            onPress={() => { setEmail(contaDemo.email); setSenha(contaDemo.senha); }}
          >
            Nenhum dado sai do aparelho. Use {contaDemo.email} / {contaDemo.senha} ou crie uma conta nova.
          </AvisoDemo>
          </View>
      </View>    
    );
}
  

   

export default Login