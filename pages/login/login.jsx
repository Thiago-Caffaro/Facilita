import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import Botao from '../../components/botao/botao';

function Login({ navigation }){
    return (
    <View style={styles.container}>
          <Image style={styles.facilitaLogoLogin} source={require('../../assets/appImages/appLogo/logoAppWhite.png')} />
          <StatusBar style="light" />
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
                <Text style={{ color: '#E8E8E8', fontSize: 12, padding: 5 }}>Esqueci minha senha</Text>
          </View>
          <View style={styles.caixaBtn}>
                <Botao>Entrar</Botao>
                <Botao onPress={() => navigation.navigate('Cadastro')}>Cadastrar</Botao>
          </View>
          <Text style={{ bottom: 0, color: '#ffff',marginTop:'auto'}}>
             Todos os ditos reservados © 2024
          </Text>
          
    </View>    
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#429D1E',
        alignItems: 'center',
        justifyContent: 'center',
      },
      facilitaLogoLogin: {
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
    
export default Login