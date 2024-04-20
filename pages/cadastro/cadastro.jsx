import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import Botao from '../../components/botao/botao';
import Checkbox from 'expo-checkbox';
import {Ionicons}  from '@expo/vector-icons'; // Importe o Ionicons

function Cadastro({navigation}){
    const [checked, setChecked] = useState(false);
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [cSenha, setCSenha] = useState('');
    const [email, setEmail] = useState('');

    const verificarCamposPreenchidos = () => {
      return matricula != '' && senha != '' && cSenha != '' && email != '' && checked != false && senha == cSenha;
    };
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
                <Ionicons name="arrow-back" size={25} color="#fff" /> 
            </TouchableOpacity>
            <Image style={styles.facilitaLogoCadastro} source={require('../../assets/appImages/appLogo/logoAppWhite.png')} />
            
            <View style={styles.inputBox}>
                <TextInput
                    style={[styles.input, {color: '#ffff'}]}
                    placeholder="Matrícula"
                    placeholderTextColor="#f5f5f5"
                    value={matricula}
                    onChangeText={setMatricula}
                />
                <TextInput
                    style={[styles.input, {color: '#ffff'}]}
                    placeholder="Senha"
                    placeholderTextColor="#f5f5f5"
                    value={senha}
                    onChangeText={setSenha}
                />
                <TextInput
                    style={[styles.input, {color: '#ffff'}]}
                    placeholder="Repita Sua Senha"
                    placeholderTextColor="#f5f5f5"
                    value={cSenha}
                    onChangeText={setCSenha}
                />
                <TextInput
                    style={[styles.input, {color: '#ffff'}]}
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

            <View style={styles.caixaBtn}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                </View>
                <View style={styles.caixaBtn}>
                <Botao onPress={() => navigation.navigate('Login')}
                disabled={!verificarCamposPreenchidos()}>Cadastrar</Botao>
          </View>

            </View>
          <Text style={{ bottom: 0, color: '#ffff',marginTop:'auto'}}>
             Todos os direitos reservados © 2024
          </Text>

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
    container: {
      flex: 1,
      backgroundColor: '#429D1E',
      alignItems: 'center',
      justifyContent: 'center',
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
    input: {
      height: 35,
      padding: 5,
      width: 250,
      marginTop: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#70d870',
    },
    inputBox: {

      marginTop: 110,
    },
    termos:{

    }
  
});

export default Cadastro
