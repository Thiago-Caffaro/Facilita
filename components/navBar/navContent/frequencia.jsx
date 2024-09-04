import { StyleSheet, Text, View} from 'react-native';
import mainWindowStyles from './mainWindow.js'


function frequencia({navigation}){
    return(
        <View id='container' style={mainWindowStyles.container}>
            <Text>Frequência</Text>
        </View>
        
    );
};

export default frequencia;