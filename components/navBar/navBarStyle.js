import { StyleSheet } from "react-native";

const navBarStyle = StyleSheet.create({
    viewNav:{
        width: "100%",
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        marginTop: '10%',
        
        marginRight:"100px"
    },
    button:{
        marginTop:15,
        color:'green',
        fontSize: 17,
        fontWeight:"bold",
    },
   
})

export default navBarStyle;