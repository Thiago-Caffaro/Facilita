import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import gradeHorariaStyles from '@/styles/gradeHorariaStyles.js';


function gradeHoraria() {
    return (
        <View id='container'>
            <View id='content' style={gradeHorariaStyles.content}>
                <View style={gradeHorariaStyles.backGround}>
                
                   <Text style={gradeHorariaStyles.title}></Text>

                </View>  
            </View>
        </View>
    );
};

export default gradeHoraria;
