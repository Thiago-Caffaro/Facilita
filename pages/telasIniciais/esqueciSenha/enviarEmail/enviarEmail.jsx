import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';
import { useState, useContext } from 'react';

import globalStyles from '../../../../styles/globalStyles.js'
import recorveryStyles from '../../../../styles/recorveryStyles.js';

import Botao from '../../../../components/botao/botao';
import LogoFacilita from '../../../../components/logoFacilita/logoFacilita.jsx';
import ReturnArrow from '../../../../components/returnArrow/returnArrow.jsx';

import { AuthContext } from '../../../../context/auth.js'

function EnviarEmail({navigation}){
    const [email, setEmail] = useState('');
    const { setSentCode } = useContext(AuthContext);

    const time = new Date();

    const sendEmail = async (email, time) => {
        await fetch('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/enviarEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            time: time.getMilliseconds()
        }),
    })
    .then((response) => response.json()) // Aqui está a correção
    .then((data) => {
        setSentCode(data.codigo);
        navigation.navigate('EnviarCod');
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
    }

    return(
    <View style={recorveryStyles.container}>
        <ReturnArrow navigation={navigation}/>
        <View style={recorveryStyles.content}>
            <LogoFacilita tamanho={50} />
            <StatusBar style="light" />
            <Text style={[recorveryStyles.hint, globalStyles.text]} >
                Digite o email cadastrado para receber o código de verificação.
            </Text>
            <View style={globalStyles.inputBox}>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Email"
                    placeholderTextColor="#f5f5f5"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={globalStyles.caixaBtn}>
                <Botao onPress={() => sendEmail(email, time)}
                >Enviar</Botao>
            </View>
        </View>
    </View>
    )
}
export default EnviarEmail;