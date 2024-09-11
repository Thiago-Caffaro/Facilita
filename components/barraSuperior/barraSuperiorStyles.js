import { StyleSheet } from "react-native";

const barraSuperiorStyles = StyleSheet.create({
    topBar:{
        height: 90,
        textAlign:"center",
        backgroundColor: '#4CAF50',
        paddingVertical: "4%",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    topBarText:{
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: "2%",
        marginHorizontal:"33%",
        textAlign: 'center',
    },
    returnArrow:{
        width: 20,
        height: 20,
        marginTop:20,
        padding:10,
        marginLeft: "20%",
        tintColor: '#fff',
    },
    userIcon: {
        position:'absolute',
        bottom: -70,
        left: '34%'
    },
})

export default barraSuperiorStyles;