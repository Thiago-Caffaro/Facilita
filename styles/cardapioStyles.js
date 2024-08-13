import { StyleSheet } from "react-native";


const cardapioStyles = StyleSheet.create({

    content:{
        alignItems:"left",
        display:"flex",
        flex:1,
        widht:"100%",
        height:"100%",
        marginTop:0,
       
    },

    line:{
        width:480,
        height:1,
        marginBottom:20,
        marginVertical:30,
        backgroundColor: "gray",
        marginLeft:40
    },

    title:{
        textAlign:"center",
        color:"white",
        borderLeftWidth:30,
        borderColor:"green",
        backgroundColor:"green",
        width:"80",
        borderRadius:10,
        marginLeft:15,
        marginRight:300,
        fontSize:20,
        fontFamily:"Arial",
        fontWeight:"bold"
    },

    infos:{
        marginTop:20,
        marginLeft:50,

    }

})

export default cardapioStyles;