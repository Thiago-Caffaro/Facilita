import { View, Text, TouchableOpacity } from 'react-native'
import {useContext, useEffect} from 'react';
import { AuthContext } from '@/context/auth';

import navBarStyle from './navBarStyle.js';

function NavBar(){
    const { setContent } = useContext(AuthContext);
    useEffect(() => {
        setContent("cardapio");
    }, []);
    return (
        <View id='navBar'>
            <View id='links' style={navBarStyle.viewNav}>
                <TouchableOpacity onPress={() => setContent("cardapio")}>
                    <Text style={navBarStyle.button}>
                        Cardápio
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity  onPress={() => setContent("gradeHoraria")}>
                    <Text style={navBarStyle.button}>
                        Grade-Horária
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => setContent("frequencia")}>
                    <Text style={navBarStyle.button}>
                        Frequência
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NavBar;