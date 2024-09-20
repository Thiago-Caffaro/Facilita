import { StyleSheet, View, Image } from 'react-native';

export default function Carregamento() {
    const loading = require("./assets/loading.gif");

    return (
        <View style={localStyles.container}>
            <Image source={loading} style={localStyles.image} />
        </View>
    );
}

const localStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',     
    },
    image: {
        width: 125, 
        height: 125, 
    },
});
