import { StyleSheet } from "react-native";

const recorveryStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#429D1E',
        padding: 30,
        alignItems: 'center',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 400,
    },
    facilitaLogo :{
        height: 100,
        maxWidth: 300,
        transform: "scale(0.5)"
    },
    input: {
        height: 35,
        padding: 5,
        width: 250,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#70d870',
    },
    hint: {
        color: '#ffff',
        textAlign: 'center',
        fontSize: 16
    }
})
export default recorveryStyles;