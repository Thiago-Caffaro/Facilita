import { Image,StyleSheet, Text, View} from 'react-native';
import mainWindowStyles from '../../styles/mainWindow.js'
import Perfil from '../perfil/perfil.jsx';



function Cardapio({navigation}){

    return(
        <View id='container' style={mainWindowStyles.container}>
            <View id='navBar' >
                <View id='links' style={mainWindowStyles.viewNav}>
                    <Text style={mainWindowStyles.button}>
                        Cardápio
                    </Text>

                    <Text style={mainWindowStyles.button}>
                        Grade-Horária
                    </Text>

                    <Text style={mainWindowStyles.button}>
                        Frequência
                    </Text>
                </View>
                <View style={styles.linha}/>
                
            </View>
            <View id='content'>
           
               
            </View>
            <View id="footer" style={styles.footer}>
            <Image
                
                style={styles.soeSopIcon} id='soeSopIcon' source={require('../../components/logoFacilita/assets/Soe_e_Sop.png')} 
             />
            <Image 
               
                style={styles.perfilIcon} id='perfilIcon' source={require('../../components/logoFacilita/assets/Perfil.png')} 
            />
            <Image 
            
                style={styles.ajudaIcon} id='ajudaIcon' source={require('../../components/logoFacilita/assets/Ajuda.png')} 
            />
            </View>
        </View>
        
    );
};
const styles = StyleSheet.create({
      footer:{
        marginTop:750,
        marginLeft:0,
        backgroundColor:'green',
        padding:50,
      },
      linha:{
        borderBottomWidth: 1.5,
        borderColor: 'green',
        marginLeft:30,
        width:368,
      },
      soeSopIcon:{    
        width: 40,
        height: 40,
       marginTop:-30,
      },
      perfilIcon:{   
        marginLeft:150,  
        width: 30,
        height: 40,
       marginTop:-40,
      },
      ajudaIcon:{   
        marginLeft:290, 
        width: 40,
        height: 40,
       marginTop:-40,
      }
});

export default Cardapio;