import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput } from 'react-native';
import { useState, useContext } from 'react';
import { signIn as amplifySignIn, confirmSignUp } from '@aws-amplify/auth';
import { router } from 'expo-router';

import globalStyles from '@/styles/globalStyles.js';
import recorveryStyles from '@/styles/recorveryStyles.js';

import Botao from '@/components/botao/botao.jsx';
import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';
import { AuthContext } from '@/context/auth';

import useInfoBox from '@/hooks/alertDialog/infoBox';

/**
 * Essa é a tela de confirmação de cadastro.
 * Aqui, o usuário irá digitar o código que foi enviado para o email
 * e, se o código for válido, o usuário será redirecionado para a
 * tela de redirect, onde irá concluir o seu cadastro. (redirectCadastro.jsx)
 */
export default function confirmarCadastro() { 
    const { senha, email, hasAlert, alertType, setHasAlert, setAlertType } = useContext(AuthContext);
    const [awsCode, setAwsCode] = useState('');
    const infoBox = useInfoBox();

    const handleSendCod = async () => {
        try {
            // Confirma o registro do usuário
            const { isSignUpComplete } = await confirmSignUp({
                username: email,
                confirmationCode: awsCode,
            });
            // Verifique se o signup foi completado com sucesso
            if (isSignUpComplete) {
                // Realiza o login do usuário
                await amplifySignIn({
                    username: email,
                    password: senha,
                    options: {
                        authFlowType: 'USER_PASSWORD_AUTH'
                    }
                });

                // Redireciona para a tela de cadastro completo
                console.log("Redirecionando...");
                router.push('redirectCadastro');
            } else {
                console.log('Signup não foi completado com sucesso.');
            }
        } catch (error) {
            setHasAlert(true);
            console.log(error, email, senha, awsCode);
            setAlertType(infoBox(error.name));
        }
    };

    return (
        <View style={recorveryStyles.container}>
            <View id='errorDialog' style={{ zIndex: 10, position: 'absolute', bottom: 0, left: 0 }}>
                {hasAlert && alertType}
            </View>
            <View style={recorveryStyles.content}>
                <LogoFacilita tamanho={50} />
                <StatusBar style="light" />
                <Text style={[recorveryStyles.hint, globalStyles.text]}>
                    Digite o código enviado para o seu email para confirmar sua conta e poder obter acesso a ela.
                </Text>
                <View style={globalStyles.inputBox}>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Código enviado"
                        placeholderTextColor="#f5f5f5"
                        value={awsCode}
                        onChangeText={setAwsCode}
                    />
                </View>
                <View style={globalStyles.caixaBtn}>
                    <Botao onPress={handleSendCod}>
                        Enviar
                    </Botao>
                </View>
            </View>
        </View>
    );
}
