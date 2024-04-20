import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Botao from '../../components/botao/botao';
import Checkbox from 'expo-checkbox';
import {Ionicons}  from '@expo/vector-icons'; // Importe o Ionicons

function Cadastro({navigation}){
    const [checked, setChecked] = useState(false);

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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <Checkbox
                        style={{ marginRight: 8 }} // Adicionado marginRight aqui
                        value={checked}
                        onValueChange={() => setChecked(!checked)}
                    />
                    <Text style={{ color: '#ffff' }}>Aceito todos os termos e condições</Text>
                </View>
                <View style={styles.caixaBtn}>
                <Botao onPress={() => navigation.navigate('Login')}>Cadastrar</Botao>
          </View>
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
    backButton: {
      position: 'absolute',
      top: 80,
      left: 20,
    },
    facilitaLogoCadastro: {
      height: 100,
      marginTop: '0%',
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
      marginTop: 80,
      alignItems: 'center'
    },
    
  });

export default Cadastro;
