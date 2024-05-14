import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import {useContext} from 'react';
import { AuthContext } from '../../context/auth.js';

import navBarStyle from './navBarStyle.js';

function NavBar(){
    const { setContent } = useContext(AuthContext);

    return (
        <View id='navBar'>
            <View id='links' style={navBarStyle.viewNav}>
                <TouchableOpacity onPress={() => setContent('a')}>
                    <Text style={navBarStyle.button}>
                        Cardápio
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity  onPress={() => setContent('b')}>
                    <Text style={navBarStyle.button}>
                        Grade-Horária
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => setContent('c')}>
                    <Text style={navBarStyle.button}>
                        Frequência
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NavBar;