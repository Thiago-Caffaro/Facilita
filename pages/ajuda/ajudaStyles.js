import { StyleSheet } from "react-native";

const ajudaStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    h1:{
        color:"#008000",
        fontWeight:"bold",
        fontSize:23,
        paddingLeft:"20%",
        paddingBottom:"12%",
    },
    content: {
        flex: 1,
        padding: "4%",
        paddingVertical:"12%",
    },
    faqItem: {
        marginBottom: 16,
    },
    question: {
        fontSize: 18,
        color:"#757575",
        fontWeight: 'bold',
        paddingVertical: "4%",
        paddingLeft: "3%",
    },
    answer: {
        fontSize: 16,
        color:"#757575",
        paddingLeft:"4%",
        paddingVertical: "2%",
        backgroundColor:"#ffff",
        borderColor:"#757575",
        borderWidth:1,
        borderRadius:3, // Alterado para número
        width:"96%",
        marginLeft:"2%",
        shadowColor:"#010101",
        shadowOffset:{
            width:"0%",
            height:"5%"},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    
    questionContainer: {
        backgroundColor:"#fff",
        flexDirection: 'row',
        borderRadius:5, // Alterado para número
        justifyContent: 'space-between',
        alignItems: "center",
        borderColor:"#008000",
        borderWidth:1,
        borderLeftColor:"#4CAF50",
        borderLeftWidth:9, // Alterado para número
        borderTopLeftRadius:6, // Alterado para número
        borderBottomLeftRadius:6, // Alterado para número
        shadowColor:"fff",
        shadowOffset:{
            width:"0%",
            height:"5%"},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    arrow: {
        width: 16,
        height: 16,
        marginRight: 8,
        transform: [{ rotate: '0deg' }],
        transition: 'transform 0.2s ease-in-out',
    },
    arrowRotated: {
        transform: [{ rotate: '180deg' }],
    },
    arrow: {
        width: 16,
        height: 10,
        marginRight: 10,
        tintColor: '#4CAF50',
    },
    arrowRotated: {
        transform: [{ rotate: '180deg' }],
    },
    
})

export default ajudaStyles;
