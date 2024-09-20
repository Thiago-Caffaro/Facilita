import { StyleSheet, Text, View} from 'react-native';
import mainWindowStyles from './mainWindow.js'
import frequenciaStyles from '@/styles/frequenciaStyles.js';


function frequencia(){
    return(
        <View id='container'>
            <View id='content'style={frequenciaStyles.content}>
                <View style={frequenciaStyles.line}/>
                <Text style={frequenciaStyles.title}>Faltas</Text>
                <Text style={frequenciaStyles.infos}>12</Text>

                <View style={frequenciaStyles.line}/>
                <Text style={frequenciaStyles.title}>Presenças</Text>
                <Text style={frequenciaStyles.infos}>24</Text>
                <View style={frequenciaStyles.line}/>
            </View>
        </View>
        
    );
};

export default frequencia;