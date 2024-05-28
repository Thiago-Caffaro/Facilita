import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#429D1E',
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },  
    text: {
        color:'#ffff'
    },
    content:{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 700,
    },

    input: {
        height: 40,
        padding: 10,
        width: 265,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#70d870',

        color: '#ffff'
    },
    caixaBtn:{
        bottom: '10%'
    },
    inputBox: {
        display: 'flex',
        justifyContent: 'space-evenly'
    }, 
    
    
})
export default globalStyles;