import { StyleSheet } from "react-native";

const barraSuperiorStyles = StyleSheet.create({
    topBar:{
        backgroundColor: '#4CAF50',
        paddingVertical: "4%",
        alignItems: 'center',
        flexDirection: 'row',
    },
    topBarText:{
        color: '#fff',
        fontSize: 27,
        fontWeight: 'bold',
        marginTop: "5%",
        marginLeft: "18%",
        textAlign: 'center',
    },
    returnArrow:{
        width: 20,
        height: 20,
        marginTop:20,
        padding:10,
        marginLeft: "20%",
        tintColor: '#fff',
    }
})

export default barraSuperiorStyles;