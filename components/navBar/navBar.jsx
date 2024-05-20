import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import {useContext} from 'react';
import { AuthContext } from '../../context/auth.js';

import navBarStyle from './navBarStyle.js';
import Cardapio from '../../pages/mainScreen/contents/cardápio/cardapio.jsx';
import gradeHoraria from '../../pages/mainScreen/contents/gradeHoraria/gradeHoraria.jsx';
import frequencia from '../../pages/mainScreen/contents/frequência/frequencia.jsx';

function NavBar(){
    const { setContent } = useContext(AuthContext);

    return (
        <View id='navBar'>
            <View id='links' style={navBarStyle.viewNav}>
                <TouchableOpacity onPress={() => setContent(Cardapio)}>
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