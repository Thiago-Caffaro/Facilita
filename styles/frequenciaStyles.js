import { StyleSheet } from "react-native";

const frequenciaStyles = StyleSheet.create({

    content:{
        alignItems:"center",
        textAlign:"center",
        display:"flex",
        flex:1,
        widht:"100%",
        height:"100%",
        marginTop:100,
    
    },

    title:{
        fontSize:25,
        fontFamily:"Arial",
        fontWeight:"bold",
        color:"green"
    },

    line:{
        width:480,
        height:1,
        marginBottom:20,
        marginVertical:30,
        backgroundColor: "gray",
        marginLeft:40
    },

    infos:{
        fontFamily:"Arial",
        fontWeight:"bold",
        fontSize:25,
        marginTop:20,
        color:"#70d870"
    }
})

export default frequenciaStyles;