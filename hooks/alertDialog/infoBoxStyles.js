import { StyleSheet, Dimensions } from "react-native";
const larguraTela = Dimensions.get('window').width;
const alturaTela = Dimensions.get('window').height;

const infoBoxStyles = StyleSheet.create({
    backgroudCover:{
        position: 'absolute',
        height: alturaTela + 50,
        width: larguraTela,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column'
    },
    container: {
        height: 125,
        width: '65%',
        padding: 10,
        display: 'flex',
        position: 'absolute',
        bottom: "40%",
        borderRadius: 5,
        backgroundColor: '#429D1E',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        zIndex: 2
    },
    text:{
        color: '#f5f5f5',
        textAlign: 'center',
        paddingRight: 10,
        paddingLeft: 10,
    }
})

export default infoBoxStyles;