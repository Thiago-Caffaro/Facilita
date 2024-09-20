import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;

const frequenciaStyles = StyleSheet.create({

    content:{
        alignItems:"center",
        textAlign:"center",
        display:"flex",
        widht:"100%",
        height:"100%",
        marginTop:100,
    
    },

    title:{
        fontSize:25,
        fontWeight:"bold",
        color:"green"
    },

    line:{
        width:screenWidth,
        height:1,
        marginBottom:20,
        marginVertical:30,
        backgroundColor: "gray",
    },

    infos:{
        fontWeight:"bold",
        fontSize:25,
        marginTop:20,
        color:"#70d870"
    }
})

export default frequenciaStyles;