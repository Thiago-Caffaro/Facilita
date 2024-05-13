import { View, Text } from "react-native";
import {useContext} from 'react';
import { AuthContext } from '../../context/auth.js';

import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";

import mainScreenStyles from "./mainWindow.js";

function MainScreen({navigation}){
    const { content } = useContext(AuthContext);
    return (
        <View id="container" style={mainScreenStyles.container} >
            <NavBar />
            <View id="mainContentBox" style={mainScreenStyles.mainContentBoxStyle}>
                <Text>{content}</Text>
            </View>
            <Footer navigation = {navigation}/>

        </View>
    );
}
export default MainScreen;