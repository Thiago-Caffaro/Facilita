import { BackHandler, StyleSheet } from "react-native";
// Por favor, fazer um estilo responsivo aqui 🙇‍♂️🙇‍♂️
const marginLeftHorario = 105;
const gradeHorariaStyles = StyleSheet.create({

    content:{
        alignItems:"left",
        display:"flex",
        widht:"100%",
        height:"100%",
        marginTop: 40,
        
        marginTop: 40,
        
    },

    backGround:{


        backgroundColor:"green",
        width:350,
        height:500,
        marginTop:200,
        borderRadius:4,
    },

    tempos:{

       marginTop:1,
       marginLeft:0,
       marginRight: 250,
       backgroundColor:"green",
       textAlign:"center",
       color:"white",
       padding: 2,
       paddingVertical: 10,
       widht: 50,
       fontSize: 16,
       borderRightWidth:1,
       borderRightColor:"white",
    },

   

    primeiroTempo:{
        position:"absolute",
        marginLeft: marginLeftHorario, 
        marginTop: 1,
    },

    segundoTempo:{
        position:"absolute",
        marginLeft: marginLeftHorario, 
        marginTop: 63,
    },

    terceiroTempo:{
        position:"absolute",
        marginLeft: marginLeftHorario, 
        marginTop: 105,
    },

    quartoTempo:{
        position:"absolute",
        marginLeft: marginLeftHorario, 
        marginTop: 167,
    },

    quintoTempo:{
        position:"absolute",
        marginLeft: marginLeftHorario, 
        marginTop: 209,
    },

    sextoTempo:{
        position:"absolute",
        marginLeft: marginLeftHorario, 
        marginTop: 271,
    },

    materias:{
       marginBottom:1,  
       backgroundColor:"green",
       width: 280, 
       textAlign:"center",
       color:"white",
    },

    professor:{
        width: 280, 
        textAlign:"center",
        backgroundColor:"white",
        paddingBottom: 2,
        fontWeight: "bold",
    },

    intervalo:{

        width:"100%",
        backgroundColor:"#808080",
        height: 20,
        color:"white",
        textAlign:"center",

    },
    title:{

        fontSize: 24,
        textAlign: "center",
        fontWeight:"bold",
        color: "white",
        padding: 6,
        borderRadius: 15,
        backgroundColor: "green",
        paddingHorizontal: 10,
        marginTop: 50,
        marginBottom: 100,
        
    },
   

    
})


export default gradeHorariaStyles;