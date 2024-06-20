import { Text, View} from 'react-native';
import { useContext, useState } from 'react';
import Botao from '@/components/botao/botao.jsx';
import infoBoxStyles from './infoBoxStyles.js';
import {AuthContext} from '@/context/auth'

function useInfoBox(){
    const { hasAlert, setHasAlert} = useContext(AuthContext);
    const errorMessages = {
        EmptySignInUsername: "Email do usuário vazio",
        EmptySignInPassword: "Senha do usuário vazia",
        InvalidPasswordException: "A senha deve ter pelo menos uma letra maiúscula, um número, e no mínimo 6 caracteres",
        InvalidParameterException: "Formato de matricula inválido",
        NotAuthorizedException: "Email ou senha incorretos", 
        ExpiredCodeException: "Código de confirmação expirado",
        Unknown: "Erro abominável, catastrófico, devastador!", 
        UsernameExistsException: "O email já existe",
        CodeMismatchException: "Código de confirmação inválido",
    }
    
    return function InfoBox(errorName){
        
        return (
            <View style={infoBoxStyles.backgroudCover}>
                <View style={infoBoxStyles.container}>
                    <Text style={infoBoxStyles.text}>
                        {errorMessages[errorName]}
                    </Text>
                    <Botao onPress={() => {setHasAlert(false), console.log(errorName, hasAlert)} } >
                        Ok
                    </Botao>
                </View>
            </View>
        );
    }
    
    
}

export default useInfoBox;