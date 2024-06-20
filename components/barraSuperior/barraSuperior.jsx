import { Text, View, Image } from "react-native"

import barraSuperiorStyles from "./barraSuperiorStyles";
import userImg from '@/assets/userIcon.png'

function BarraSuperior({children, onLayout}){
    if (children == 'Perfil'){
      return (
        <View style={barraSuperiorStyles.topBar} onLayout={onLayout} >
          <Image style={barraSuperiorStyles.userIcon} source={userImg}></Image>
        </View>
      )
    }else{
      return (
        <View style={barraSuperiorStyles.topBar} onLayout={onLayout} >
          <Text style={barraSuperiorStyles.topBarText}>{children}</Text>
        </View>
      )
    }
    

}
export default BarraSuperior;