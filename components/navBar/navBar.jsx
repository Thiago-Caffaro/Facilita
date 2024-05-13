import mainWindowStyles from '../../styles/mainWindow.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native'
import {useContext} from 'react';
import { AuthContext } from '../../context/auth.js';

function NavBar(){
    const { setContent } = useContext(AuthContext);

    return (
        <View id='navBar' >
            <View id='links' style={mainWindowStyles.viewNav}>
                <TouchableOpacity onPress={() => setContent('a')}>
                    <Text style={mainWindowStyles.button} >
                        Cardápio
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity  onPress={() => setContent('b')}>
                    <Text style={mainWindowStyles.button}>
                        Grade-Horária
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => setContent('c')}>
                    <Text style={mainWindowStyles.button}>
                        Frequência
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linhaSelecionado}/>
            <View style={styles.linha}/>
        </View>
    )
}
const styles = StyleSheet.create({
    footer:{
        marginTop:680,
        marginLeft:0,
        backgroundColor:'green',
        padding:50,
    },
    linha:{
      borderBottomWidth: 1.5,
      borderColor: 'green',
      marginLeft:30,
      width:368,
      borderRadius:5,
    },
    soeSopIcon:{    
      width: 41,
      height: 40,
     marginTop:-30,
    },
    perfilIcon:{   
      marginLeft:150,  
      width: 30,
      height: 34,
     marginTop:-35,
    },
    ajudaIcon:{   
      marginLeft:290, 
      width: 35,
      height: 35,
     marginTop:-35,
    },
    linhaSelecionado:{
      borderBottomWidth: 2,
      borderRadius:5,
      borderColor: '#00FF7F',
      marginLeft:30,
      width:68
    }
});
export default NavBar;