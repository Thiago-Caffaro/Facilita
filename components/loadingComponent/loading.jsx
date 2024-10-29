import loadingGif from '@/assets/loading.gif'
import perfilStyle from '@/styles/perfilStyle.js';
import { View, Image } from 'react-native';
export function Loading() {
    
    return (
        <View style={perfilStyle.loadingGifBox}>
            <Image source={loadingGif} style={perfilStyle.loadingGif}/>
        </View>     
    )
}
