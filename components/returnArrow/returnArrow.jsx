import { TouchableOpacity } from "react-native-gesture-handler";
import {Ionicons}  from '@expo/vector-icons';

function ReturnArrow({navigation}){
    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('Login')} 
            style={{
                position: 'absolute',
                top: 80,
                left: 20,
            }}
        >
            <Ionicons name="arrow-back" size={25} color="#0000" /> 
        </TouchableOpacity>
    )
}
export default ReturnArrow;