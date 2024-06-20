import { StyleSheet } from "react-native";

const perfilStyle = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        display: 'flex',
    },
    loadingGif:{
        width: 100,
        height: 100,
    },
    loadingGifBox:{
        width: '100%',
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    perfilArea: {
        height: '100%',
        paddingTop: 70,

        padding: 10,
        display: 'flex',

    },
    perfilData:{
        padding:5,

    },
    itemBox: {
        display: 'flex',
        flexDirection: 'column',

        paddingBottom: 6,
        margin: 2.5,
    },
    itemTitle:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#565656'
    },
    perfilItem: {
        fontSize: 16,
        color: '#7c7c7c',
        margin: 5,
    },
    nomeBox: {
        marginBottom: 20,
    },
    nome: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    barCodeBox:{
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeImage:{
        height: 150,
        width: 350
    }
    
})

export default perfilStyle;