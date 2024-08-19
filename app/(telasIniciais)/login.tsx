import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { router, useSegments  } from 'expo-router';

import globalStyles from '@/styles/globalStyles.js';

import Botao from '@/components/botao/botao.jsx';
import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';

import useSignIn from '@/hooks/signIn-up/signIn.js';
import useLimparVariaveisGlobais from '@/hooks/useLimparVariaveisGlobais';

import {AuthContext} from '@/context/auth'
function Login() {
    const hiddenIcon = require('@/assets/icons/olhoSemVer.png');
		const visibleIcon = require('@/assets/icons/olhoVendo.png');

    const [isHidden, setIsHidden] = useState(true);
    const { email, setEmail, senha, setSenha, hasAlert, alertType, } = useContext(AuthContext);

    const signIn = useSignIn();
    const segments = useSegments(); // pega o caminho da rota atual
    const limparVariaveisGlobais = useLimparVariaveisGlobais();

    // UseEffect para limpar os campos de texto quando o componente é montado
    useEffect(() => {
      
      const handleRouteChange = () => {
        if (segments[0] === 'login') {
          limparVariaveisGlobais();
        }
      };
      // Chama a função handleRouteChange quando o componente é montado/mudado
      handleRouteChange();
    }, [segments]);
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
                  <View style={globalStyles.inputBoxPass}>
                    <TextInput
                      style={globalStyles.input}
                      placeholder="Senha"
                      placeholderTextColor="#f5f5f5"
                      value={senha}
                      onChangeText={setSenha}
                      secureTextEntry={true ? isHidden : false}
                    />
                    <TouchableOpacity style={globalStyles.eyeStyle} onPress={() => setIsHidden(!isHidden)}>
                      <Image style={globalStyles.eyeImageStyle} 
                      source={hiddenIcon ? isHidden ? hiddenIcon : visibleIcon : hiddenIcon}></Image>
                    </TouchableOpacity>
                  </View>
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