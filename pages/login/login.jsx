import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';

import globalStyles from '../../styles/globalStyles.js'
import Botao from '../../components/botao/botao';

function Login({ navigation }){
    return (
    <View style={globalStyles.container}>
          <Image style={styles.facilitaLogoLogin} source={require('../../assets/appImages/appLogo/logoAppWhite.png')} />
          <StatusBar style="light" />
          <View style={globalStyles.inputBox}>
                <TextInput
                style={[globalStyles.input, {color: '#ffff'}]}
                placeholder="Matrícula"
                placeholderTextColor="#f5f5f5"
                />
                <TextInput
                style={[globalStyles.input, {color: '#ffff'}]}
                placeholder="Senha"
                placeholderTextColor="#f5f5f5"
                />
                <Text style={{ color: '#E8E8E8', fontSize: 12, padding: 5 }}>Esqueci minha senha</Text>
          </View>
          <View style={globalStyles.caixaBtn}>
                <Botao>Entrar</Botao>
                <Botao onPress={() => navigation.navigate('Cadastro')}>Cadastrar</Botao>
          </View>
          
    </View>    
      );
    }
    
    const styles = StyleSheet.create({
      facilitaLogoLogin: {
        height: 100,
        marginTop: '50%',
        maxWidth: 300,
      },

    });
    
export default Login