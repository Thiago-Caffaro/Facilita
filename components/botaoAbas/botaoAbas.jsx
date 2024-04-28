import { TouchableOpacity, Text, StyleSheet} from "react-native"
import { useState } from 'react';


function BotaoAbas({navigation, children}){
    
const [pressionado, setPressionado] = useState(false);
const estiloTexto = {
    color: '#0000',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: pressionado ? '#70d870' : '#0000',
    width: 90,
    textAlign: 'center',
  };

   return(
    <TouchableOpacity
        onPress={() => setPressionado(true)}

        >
        <Text style={estiloTexto}>
            {children}
        </Text>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
    btn:{
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
    },
    texto:{
        color: '#f5f5f5',
        borderWidth: 1, 
        borderRadius: 5,
        borderColor: '#70d870',
        padding: 8,
        width: 90, 
        textAlign: 'center'
    },
    
}
)
export default BotaoAbas;