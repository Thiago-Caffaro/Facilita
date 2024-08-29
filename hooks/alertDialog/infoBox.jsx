import { Text, View} from 'react-native';
import { useContext, useEffect } from 'react';
import Botao from '@/components/botao/botao.jsx';
import infoBoxStyles from './infoBoxStyles.js';
import {AuthContext} from '@/context/auth'
import useSignOut from '@/hooks/useSignOut';

function useInfoBox(){
    /**
     * Um custom Hook que fornece o componente InfoBox para exibir mensagens de erro.
     * Ele obtém mensagens de erro de './errorList' e retorna uma função que renderiza o InfoBox.
     * O InfoBox inclui um botão de confirmação que lida com diferentes casos de erro.
    */
   /**
    * Para utilizar em outros componentes, deve:
    * 1 - Colocar este componente no topo do componente desejado
    * 2 - setHasAlert(true); setAlertType(infoBox(error.name)); chamar esses dois atributos para mostrar o alerta e informar o erro via um catch
    * <View id='errorDialog' style={{ zIndex: 10, position: 'absolute', bottom: 0, left: 0 }}>
            {hasAlert && alertType}
       </View>
    */
    const { setHasAlert} = useContext(AuthContext);
    const signOut = useSignOut();
    const errorMessages = require('./errorList.json').errorMessages; // Aqui pego as mensagens de erros do arquivo JSON.
    
    return function InfoBox(errorName){
        console.log(errorMessages[errorName]['message'])
        const handleConfirmationButton = () => {
            switch (errorName) {
                case "UserAlreadyAuthenticatedException" || "UserUnAuthenticatedException":
                    // Caso a conta já estiver logada, ou ela não estiver autenticada, ao clicar em "OK", a conta sairá e o alerta fechará
                    signOut();
                    setHasAlert(false);
                    break;
                default:
                    // Se não for nenhum dos casos acima, ao clicar em "OK", o alerta será apenas fechado
                    setHasAlert(false);
            }
            
        }
        return (
            <View style={infoBoxStyles.backgroudCover}>
                <View style={infoBoxStyles.container}>
                    <Text style={infoBoxStyles.text}>
                        {errorMessages[errorName]['message']}
                    </Text>
                    <Text style={infoBoxStyles.text}>
                        Código do erro: {errorMessages[errorName]['id']}
                    </Text>
                    <Botao onPress={() => {handleConfirmationButton()} } >
                        Ok
                    </Botao>
                </View>
            </View>
        );
    }
    
    
}

export default useInfoBox;