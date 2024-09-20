import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window'); // Obtém as dimensões da tela

const cardapioStyles = StyleSheet.create({

    content: {
        alignItems: "flex-start",
        display: "flex",

        width: "100%", // ou width se preferir um valor fixo em pixels
        height: "100%", // ou height se preferir um valor fixo em pixels
        marginTop: 0,
    },

    line: {
        height: 1,
        width: width, // 90vw, por exemplo
        marginBottom: 15,
        marginVertical: 15,
        backgroundColor: "gray",
    },

    title: {
        textAlign: "center",
        color: "white",
        borderLeftWidth: 30,
        borderColor: "green",
        backgroundColor: "green",
        borderRadius: 10,
        paddingTop: 6,
        paddingBottom: 6,
        fontSize: 20,
        marginLeft: -50,
        width: width * 0.8, // 80vw
    },

    infos: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 15,
    }

});

export default cardapioStyles;
