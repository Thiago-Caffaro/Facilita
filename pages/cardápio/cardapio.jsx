import { Text, View, TextInput } from 'react-native';
import mainWindowStyles from '../../styles/mainWindow.js'
import BotaoAbas from '../../components/botaoAbas/botaoAbas.jsx';

function Cardapio({navigation}){

    return(
        <View id='container' style={mainWindowStyles.container}>
            <View id='navBar' >
                <View id='links' style={mainWindowStyles.viewNav}>
                    <BotaoAbas style={mainWindowStyles.button}>
                        Cardápio
                    </BotaoAbas>

                    <BotaoAbas style={mainWindowStyles.button}>
                        Grade-Horária
                    </BotaoAbas>

                    <BotaoAbas style={mainWindowStyles.button}>
                        Frequência
                    </BotaoAbas>
                </View>
                
            </View>
            <View id='content'>

            </View>
        </View>
        
    );
};

export default Cardapio;