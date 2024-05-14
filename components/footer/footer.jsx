import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import Perfil from '../../pages/perfil/perfil.jsx';

function Footer({navigation}){
    return (
        <View id="footer" style={styles.footer}>
            <TouchableOpacity>
                <Image
                    style={styles.icon}
                    id='soeSopIcon' 
                    source={require('./../logoFacilita/assets/Soe_e_Sop.png')} 
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                <Image 
                    style={[styles.icon, {height: 50}]} 
                    id='perfilIcon' 
                    source={require('./../logoFacilita/assets/Perfil.png')}
                />
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Image 
                    style={styles.icon} 
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
    icon:{
        height: 45,
        width: 45
    }
});
export default Footer;