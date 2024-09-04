import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import gradeHorariaSyles from '@/styles/gradeHorariaStyles.js';


function gradeHoraria({ navigation }) {
    return (
        <View id='container'>
            <View id='content' style={gradeHorariaSyles.content}>
                <View style={gradeHorariaSyles.backGround}>
                
                   <Text style={gradeHorariaStyles.title}></Text>
                   
                  
                
                </View>  
            </View>
        </View>
    );
};

export default gradeHoraria;
