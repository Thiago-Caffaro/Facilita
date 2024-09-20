import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import {useContext} from 'react';
import { AuthContext } from '@/context/auth';

import navBarStyle from './navBarStyle.js';
import Cardapio from './navContent/cardapio.jsx';
import gradeHoraria from './navContent/gradeHoraria.jsx';
import frequencia from './navContent/frequencia.jsx';

function NavBar(){
    const { setContent } = useContext(AuthContext);

    return (
        <View id='navBar'>
            <View id='links' style={navBarStyle.viewNav}>
                <TouchableOpacity onPress={() => setContent("cardapio")}>
                    <Text style={navBarStyle.button}>
                        Cardápio
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity  onPress={() => setContent(gradeHoraria)}>
                    <Text style={navBarStyle.button}>
                        Grade-Horária
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => setContent(frequencia)}>
                    <Text style={navBarStyle.button}>
                        Frequência
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NavBar;