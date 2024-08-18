import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
export default function SetaSuperior(){
    // Este seta ficará no canto superior esquerdo, e voltará uma tela
    // OBS: ela também irá limpar as variáveis dos campos de texto
    const router = useRouter();
    const handleReturn = () => {
        router.back();
    };
    return(
        <TouchableOpacity onPress={() => handleReturn()} style={localStyles.container}>
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
    );
}
const localStyles = StyleSheet.create({
    container: {
      position: 'absolute',
      padding: 20,
      top: 40,
      left: 20,
    },
  });

