import { Dimensions, StyleSheet } from "react-native";

const screenHeight = Dimensions.get('window').height;

const gradeHorariaStyles = StyleSheet.create({
    
    content: {
        width: "100%",
        height: "100%",
        marginTop: 40,
        paddingHorizontal: 10,
    },

    backGround: {
        backgroundColor: "green",
        borderRadius: 4,
    },

    tempos: {
        backgroundColor: "green",
        textAlign: "center",
        color: "white",
        paddingVertical: 10,
        fontSize: 16,
        borderRightWidth: 1,
        borderRightColor: "white",
        width: "100%", // largura total para garantir que o tempo ocupe toda a linha
    },

    box: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between", // Distribui os elementos uniformemente
        alignItems: "center",
        paddingVertical: 5,
    },

    materias: {
        backgroundColor: "green",
        textAlign: "center",
        color: "white",
        flex: 1, // permite que a matéria ocupe o espaço disponível
        paddingVertical: 5,
    },

    professor: {
        textAlign: "center",
        backgroundColor: "white",
        paddingVertical: 5,
        fontWeight: "bold",
        flex: 1, // permite que o nome do professor ocupe o espaço restante
    },

    intervalo: {
        backgroundColor: "#808080",
        height: 30,
        color: "white",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        lineHeight: 30, // centraliza verticalmente o texto
        fontWeight: "bold",
        marginVertical: 5,
    },

    title: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        padding: 10,
        borderRadius: 15,
        backgroundColor: "green",
        marginBottom: 20,
    },
});

export default gradeHorariaStyles;
