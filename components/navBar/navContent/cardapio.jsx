import {Text, View} from 'react-native';
import mainScreenStyles from './mainWindow.js'
import cardapioStyles from '../../../styles/cardapioStyles.js';



function Cardapio({navigation}){
    return(
     
        <View id='container'>
            <View id='content' style={cardapioStyles.content}>
                <View style={cardapioStyles.line}/> 
                <Text style={cardapioStyles.title}>Segunda, 19/08</Text>
                <Text style={cardapioStyles.infos}>
                    ARROZ PARBOLIZADO E FEIJÃO PRETO{'\n'}PICADINHO DE CARNE{'\n'}BATATA SAUTÊ
                </Text>
                <View style={cardapioStyles.line}/> 
                
                <Text style={cardapioStyles.title}>Terça, 20/08</Text>
                <Text style={cardapioStyles.infos}>
                    ARROZ PARBOLIZADO E FEIJÃO PRETO{'\n'}PICADINHO DE CARNE{'\n'}BATATA SAUTÊ
                </Text>
                <View style={cardapioStyles.line}/>

                <Text style={cardapioStyles.title}>Quarta, 21/08</Text>
                <Text style={cardapioStyles.infos}>
                    ARROZ PARBOLIZADO E FEIJÃO PRETO{'\n'}PICADINHO DE CARNE{'\n'}BATATA SAUTÊ
                </Text>
                <View style={cardapioStyles.line}/>

                <Text style={cardapioStyles.title}>Quinta, 22/08</Text>
                <Text style={cardapioStyles.infos}>
                    ARROZ PARBOLIZADO E FEIJÃO PRETO{'\n'}PICADINHO DE CARNE{'\n'}BATATA SAUTÊ
                </Text>
                <View style={cardapioStyles.line}/>

                <Text style={cardapioStyles.title}>Sexta, 23/08</Text>
                <Text style={cardapioStyles.infos}>
                    ARROZ PARBOLIZADO E FEIJÃO PRETO{'\n'}PICADINHO DE CARNE{'\n'}BATATA SAUTÊ
                </Text>
                <View style={cardapioStyles.line}/>
            </View>
        </View>
        
    );
};




export default Cardapio;