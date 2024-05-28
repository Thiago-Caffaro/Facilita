import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import Perfil from '../../pages/perfil/perfil.jsx';

function Footer({navigation}){
    return (
        <View id="footer" style={styles.footer}>
              <TouchableOpacity onPress={() => navigation.navigate('TelaReclamação')}>
                <Image
                    style={{width: 40, height: 40}}
                    id='soeSopIcon'
                    source={require('./../logoFacilita/assets/Soe_e_Sop.png')} 
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                <Image 
                    style={{width: 30, height: 35}} 
                    id='perfilIcon' 
                    source={require('./../logoFacilita/assets/Perfil.png')}
                />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Ajuda')}>
                <Image 
                    style={{width: 35, height: 35}}  
                    id='ajudaIcon' 
                    source={require('./../logoFacilita/assets/Ajuda.png')} 
                />
            </TouchableOpacity>
        </View>
    )
    
}
const styles = StyleSheet.create({
    footer:{
        height: 70,
        width: '100%',

        position: 'absolute',
        bottom: 0,

        display: 'flex',
        justifyContent:'space-around',
        alignItems: 'center',
        flexDirection:'row',


        backgroundColor:'green',
    },
});
export default Footer;