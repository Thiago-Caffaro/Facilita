import { View } from "react-native";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import {useContext} from 'react';
import { AuthContext } from '../../context/auth.js';
import { Text } from "react-native";

function MainScreen({navigation}){
    const { content } = useContext(AuthContext);
    return (
        <View>
            <NavBar />
            <View id="mainContentBox">
                <Text>{content}</Text>
            </View>
            <Footer navigation = {navigation}/>
        </View>
    );
}
export default MainScreen;