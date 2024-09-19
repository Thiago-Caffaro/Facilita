import { View, Text } from "react-native";
import {useContext} from 'react';
import { AuthContext } from '@/context/auth';
import { StyleSheet } from "react-native";

import NavBar from "@/components/navBar/navBar.jsx";

function MainScreen(){
    const { content } = useContext(AuthContext);
    
    return (
        <View id="container" style={mainScreenStyles.container} >
            <NavBar />
            <View id="mainContentBox" style={mainScreenStyles.mainContentBoxStyle}>
                {content}
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
        maxHeight: '80%',
        maxWidth: "100%",
    },

    
})
export default MainScreen;