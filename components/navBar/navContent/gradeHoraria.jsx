import { StyleSheet, Text, View} from 'react-native';
import mainWindowStyles from './mainWindow.js'


function gradeHoraria({navigation}){
    return(
        <View id='container' style={mainWindowStyles.container}>
            <Text>Grade-Horária</Text>
        </View>

    );
};

export default gradeHoraria;