import { TouchableOpacity, Text, StyleSheet } from "react-native"
function Botao({onPress, children, disabled=false }){
    const estiloBotao = disabled ? styles.btnDesativado : styles.btn;
    const estiloTexto = disabled ? styles.textoDesativado : styles.texto;

    return (
        <TouchableOpacity
            style={estiloBotao}
            onPress={disabled ? null : onPress}
            activeOpacity={disabled ? 1 : 0.2}
        >
        <Text style={estiloTexto}>
            {children}
        </Text>
      </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    btn:{
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
    },
    texto:{
        color: '#f5f5f5',
        borderWidth: 1, 
        borderRadius: 5,
        borderColor: '#70d870',
        padding: 8,
        width: 90, 
        textAlign: 'center'
    },
    btnDesativado:{
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        opacity: 0.80,
    },
    textoDesativado:{
        color: '#f5f5f5',
        borderWidth: 1, 
        borderRadius: 5,
        borderColor: '#70d870',
        padding: 8,
        width: 90, 
        textAlign: 'center',
        opacity: 0.80
    },
}
)
export default Botao;