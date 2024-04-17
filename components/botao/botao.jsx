import { TouchableOpacity, Text, StyleSheet } from "react-native"
function Botao(props){
    return (
        <TouchableOpacity
            style={styles.btn}
        >
        <Text style={{ color: '#5bea5b' }}>
            {props.children}
        </Text>
      </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    btn:{
        marginBottom: 20,
        borderWidht: 20,
        borderRadius: 10,
        borderColor:'#70d870',
      }
})

export default Botao