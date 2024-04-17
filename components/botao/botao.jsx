import { TouchableOpacity, Text, StyleSheet } from "react-native"
function Botao({onPress, children}){
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={onPress}
        >
        <Text style={{ color: '#f5f5f5', borderWidth: 1, borderRadius: 5, borderColor: '#70d870', padding: 8, width: 90, textAlign: 'center'}}>
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
})

export default Botao;