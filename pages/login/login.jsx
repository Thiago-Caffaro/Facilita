import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import Botao from '../../components/botao/botao';

function Login(){
    return (
    <>
          <Image style={styles.facilitaLogo} source={require('../../assets/appImages/appLogo/logoAppWhite.png')} />
          <StatusBar style="auto" />
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
                <Botao>Cadastrar</Botao>
          </View>
          <Text style={{ bottom: 0, color: '#ffff',marginTop:'auto'}}>
             Todos os direitos reservados © 2024
          </Text>
    </>    
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#429D1E',
        alignItems: 'center',
        justifyContent: 'center',
      },
      facilitaLogo: {
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