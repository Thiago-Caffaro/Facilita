import { View, Text } from "react-native";
import {useContext} from 'react';
import { AuthContext } from '@/context/auth';
import { StyleSheet } from "react-native";

import NavBar from "@/components/navBar/navBar.jsx";
import Cardapio from "@/components/navBar/navContent/cardapio";
import Frequencia from "@/components/navBar/navContent/frequencia";
import GradeHoraria from "@/components/navBar/navContent/gradeHoraria";

function MainScreen(){
    const { content } = useContext(AuthContext);
    
    return (
        <View id="container" style={mainScreenStyles.container} >
            <NavBar />
            <View id="mainContentBox" style={mainScreenStyles.mainContentBoxStyle}>
              
              {content == "cardapio" ? <Cardapio/> : content == "frequencia" ? <Frequencia/> : content == "gradeHoraria" ? <GradeHoraria/> : null}

            </View>
        </View>
    );
}
const mainScreenStyles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
    
    },
    
    mainContentBoxStyle:{
        maxHeight: '100%',
        maxWidth: "100%",
    },

    
})
export default MainScreen;