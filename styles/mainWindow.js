import { StyleSheet } from "react-native";

const mainWindowStyles = StyleSheet.create({
    container: {
        height: '100vh',
        width: '100vw',
        paddingTop: 50
    },
    viewNav:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        width: "100vw",
        height: 40,
    },
    button:{
        color:'green',
        fontSize: 17,
    },
    info: {
        padding: 30
    }
})

export default mainWindowStyles;