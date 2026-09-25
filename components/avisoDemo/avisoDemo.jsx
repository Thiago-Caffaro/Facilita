import { Text, View, StyleSheet } from 'react-native';

// Caixa que explica o que digitar em cada tela quando o app está no modo demonstração
/** @param {{ children: import('react').ReactNode, acao?: string, onPress?: () => void }} props */
function AvisoDemo({ children, acao, onPress }) {
    return (
        <View style={localStyles.caixa}>
            <Text style={localStyles.titulo}>Modo demonstração</Text>
            <Text style={localStyles.texto}>{children}</Text>
            {onPress && (
                <Text style={localStyles.acao} onPress={onPress}>{acao}</Text>
            )}
        </View>
    );
}

const localStyles = StyleSheet.create({
    caixa: {
        width: 265,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#70d870',
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
    titulo: {
        color: '#f5f5f5',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    texto: {
        color: '#E8E8E8',
        fontSize: 13,
    },
    acao: {
        color: '#f5f5f5',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginTop: 8,
    },
});

export default AvisoDemo;
