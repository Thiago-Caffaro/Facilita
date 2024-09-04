import { StyleSheet, Text, View} from 'react-native';
import mainWindowStyles from './mainWindow.js'


function Cardapio({navigation}){
    return(
        <View id='container' style={mainWindowStyles.container}>
            <Text>Cardapio</Text>
        </View>
        
    );
};

export default Cardapio;