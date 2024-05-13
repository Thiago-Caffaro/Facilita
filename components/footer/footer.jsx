import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import Perfil from '../../pages/perfil/perfil.jsx';

function Footer({navigation}){
    return (
        <View id="footer" style={styles.footer}>
            <TouchableOpacity>
                <Image
                    style={styles.soeSopIcon}
                    id='soeSopIcon' 
                    source={require('./../logoFacilita/assets/Soe_e_Sop.png')} 
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                <Image 
                    style={styles.perfilIcon} 
                    id='perfilIcon' 
                    source={require('./../logoFacilita/assets/Perfil.png')}
                />
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Image 
                    style={styles.ajudaIcon} 
                    id='ajudaIcon' 
                    source={require('./../logoFacilita/assets/Ajuda.png')} 
                />
            </TouchableOpacity>
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
export default Footer;