import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Image, TextInput, TouchableOpacity } from 'react-native';

import Botao from './components/botao/botao';

export default function App() {

  return (
    <View style={styles.container}>
      <Image style={styles.facilitaLogo} source={require('./assets/appImages/facilitaLogo.png')} />
      <StatusBar style="auto" />
      <TextInput 
        style={styles.input}
        placeholder="Matrícula"
        placeholderTextColor="#f5f5f5"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#f5f5f5"
      />
      <Botao>Entrar</Botao>
      <Botao>Cadastrar</Botao>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b7ffb7',
    alignItems: 'center',
    textAlign:'center',
  },
  facilitaLogo:{
    height: 100,
    maxWidth: 300,
    marginBottom: 150,
    marginTop:'40%'
  },
  input:{
    color:"#ffff",
    height: 35,
    padding: 5,
    width: 225,
    marginBottom: 20,
    borderRadius: 10,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: '#70d870',
  },
  
  });
