import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { useState, useContext } from 'react';

import globalStyles from '@/styles/globalStyles.js'
import recorveryStyles from '@/styles/recorveryStyles.js';

import Botao from '@/components/botao/botao';
import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';

import useNewPassword from '@/hooks/useNewPassword';

import { AuthContext } from '@/context/auth'
import { router } from 'expo-router';

function NovaSenha(){
  /**
   * A tela para lidar com o processo de criação de uma nova senha.
   * Ela renderiza uma exibição com campos de entrada para a nova senha e sua confirmação,
   * e um botão para enviar a nova senha.
  */
  const [senha, setSenha] = useState('');
  const [cSenha, setCSenha] = useState('');
  const [isHidden, setIsHidden] = useState(true);
	const hiddenIcon = require('@/assets/icons/olhoSemVer.png');
	const visibleIcon = require('@/assets/icons/olhoVendo.png');

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
						
						<View style={globalStyles.inputBoxPass}>
							<TextInput
									style={globalStyles.input}
									placeholder="Repita Sua Senha"
									placeholderTextColor="#f5f5f5"
									value={cSenha}
									onChangeText={setCSenha}
									secureTextEntry={true ? isHidden : false}
							/>
						</View>
          </View>
          <View style={globalStyles.caixaBtn}>
              <Botao 
                disabled={!verificarCamposPreenchidos()}
                onPress={() => handleAlterarSenha()}
              >
                Redefinir
              </Botao>
          </View>
      </View>
    </View>
  );
}

export default NovaSenha;