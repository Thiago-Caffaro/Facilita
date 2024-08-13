import { TouchableOpacity,StyleSheet, Text, View} from 'react-native';
import mainWindowStyles from './mainWindow.js';
import gradeHorariaSyles from '../../../styles/gradeHorariaStyles.js';


function gradeHoraria({navigation}){
    return(
        <View id='container'>
            <View id='content'style={gradeHorariaSyles.content}>
                <TouchableOpacity></TouchableOpacity>
            </View>
        </View>

    );
};

export default gradeHoraria;