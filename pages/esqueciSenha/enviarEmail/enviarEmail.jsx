import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput} from 'react-native';

import globalStyles from '../../../styles/globalStyles.js'
import recorveryStyles from '../../../styles/recorveryStyles.js';

import Botao from '../../../components/botao/botao';
import LogoFacilita from '../../../components/logoFacilita/logoFacilita.jsx';
import ReturnArrow from '../../../components/returnArrow/returnArrow.jsx';

function EnviarEmail({navigation}){
    return(
    <View style={recorveryStyles.container}>
        <ReturnArrow navigation={navigation}/>
        <View style={recorveryStyles.content}>
            <LogoFacilita tamanho={50} />
            <StatusBar style="light" />
            <Text style={[recorveryStyles.hint, globalStyles.text]} >
                Digite seu email cadastrado para receber um código de verificação.
            </Text>
            <View style={globalStyles.inputBox}>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Email"
                    placeholderTextColor="#f5f5f5"
                />
            </View>
            <View style={globalStyles.caixaBtn}>
                <Botao onPress={() => navigation.navigate('EnviarCod')}
                >Enviar</Botao>
            </View>
        </View>
    </View>
    )
}
export default EnviarEmail;