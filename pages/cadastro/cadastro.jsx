import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { useState } from 'react';

import Botao from '../../components/botao/botao';
import Checkbox from 'expo-checkbox';

function Cadastro(){
    const [checked, setChecked] = useState(false);

    return(
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image style={styles.facilitaLogoCadastro} source={require('../../assets/appImages/appLogo/logoAppWhite.png')} />
            
            <View style={styles.inputBox}>
                <TextInput
                    style={[styles.input, {color: '#ffff'}]}
                    placeholder="Matrícula"
                    placeholderTextColor="#f5f5f5"
                />
                <TextInput
                    style={[styles.input, {color: '#ffff'}]}
                    placeholder="Senha"
                    placeholderTextColor="#f5f5f5"
                />
                <TextInput
                    style={[styles.input, {color: '#ffff'}]}
                    placeholder="Repita Sua Senha"
                    placeholderTextColor="#f5f5f5"
                />
                <TextInput
                    style={[styles.input, {color: '#ffff'}]}
                    placeholder="E-mail"
                    placeholderTextColor="#f5f5f5"
                />
                <Checkbox
                    value={checked}
                    onValueChange={() => setChecked(!checked)}
                   
                />
                <Text style={{display: 'flex'}}>Aceito todos os termos e condições</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#429D1E',
      alignItems: 'center',
      justifyContent: 'center',
    },
    facilitaLogoCadastro: {
      height: 100,
      marginTop: '50%',
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
    caixaBtn: {
      marginTop: 5,
    },
    inputBox: {
      marginTop: 110,
    }
  });
export default Cadastro;