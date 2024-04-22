import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import Botao from '../../components/botao/botao';
import Checkbox from 'expo-checkbox';
import {Ionicons}  from '@expo/vector-icons'; // Importe o Ionicons
import globalStyles from '../../styles/globalStyles.js'

import { Send } from '../../sendData.js';


function Cadastro({navigation}){
    const [checked, setChecked] = useState(false);
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [cSenha, setCSenha] = useState('');
    const [email, setEmail] = useState('');

    let userData = {
      matricula: matricula,
      email: email,
      senha: senha
    };// Dados para serem enviados
    
    // Função para juntar o redirecionamento de página logo após meio segundo do Cadastro
    const handleSendLogin = () =>{
      Send(userData);
      setTimeout(() => {
        // OBS: Aqui crio uma arrow Function para o navigate não ser executado imediatamente
        navigation.navigate('Login');
      }, 500)
    }

    const verificarCamposPreenchidos = () => {
      return matricula != '' && senha != '' && cSenha != '' && email != '' && checked != false && senha == cSenha;
    };
    return(
        <View style={globalStyles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
                <Ionicons name="arrow-back" size={25} color="#fff" /> 
            </TouchableOpacity>
            <Image style={styles.facilitaLogoCadastro} source={require('../../assets/appImages/appLogo/logoAppWhite.png')} />
            
            <View style={globalStyles.inputBox}>
                <TextInput
                    style={[globalStyles.input, {color: '#ffff'}]}
                    placeholder="Matrícula"
                    placeholderTextColor="#f5f5f5"
                    value={matricula}
                    onChangeText={setMatricula}
                />
                <TextInput
                    style={[globalStyles.input, {color: '#ffff'}]}
                    placeholder="Senha"
                    placeholderTextColor="#f5f5f5"
                    value={senha}
                    onChangeText={setSenha}
                />
                <TextInput
                    style={[globalStyles.input, {color: '#ffff'}]}
                    placeholder="Repita Sua Senha"
                    placeholderTextColor="#f5f5f5"
                    value={cSenha}
                    onChangeText={setCSenha}
                />
                <TextInput
                    style={[globalStyles.input, {color: '#ffff'}]}
                    placeholder="E-mail"
                    placeholderTextColor="#f5f5f5"
                    value={email}
                    onChangeText={setEmail}
                />

              <View style={styles.viewCheck}>  
                <Checkbox
                  style={[styles.checkBox, { borderColor: '#ffff' }]} // Define a cor da borda
                  value={checked}
                  onValueChange={() => setChecked(!checked)}
                  tintColors={{ true: '#ffff', false: '#ffff' }} // Define a cor do ícone
                />
                  <Text style={[styles.termos, {marginLeft: 5,marginTop: 10,color: '#ffff' }]}>Aceito todos os termos e condições</Text>
            </View>  
        </View>
            <View style={globalStyles.caixaBtn}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                </View>
                <View style={globalStyles.caixaBtn}>
                <Botao onPress={() => handleSendLogin()}
                disabled={!verificarCamposPreenchidos()}>Cadastrar</Botao>
            </View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    checkBox:{
      color: '#ffff',
      marginTop: 10,
      width: 15,
      height: 15
    }, 
    btnCadastrar:{
      marginTop: 20,
      marginBottom:2,
    },
    viewCheck:{
      flexDirection: 'row'
    },
    backButton: {
      position: 'absolute',
      top: 80,
      left: 20,
    },
    facilitaLogoCadastro: {
      height: 100,
      marginTop: '30%',

      maxWidth: 300,
    },
    termos:{

    }
  
});

export default Cadastro
