import { TouchableOpacity, Text, View, Image } from "react-native"
import { useNavigation } from '@react-navigation/native';

import barraSuperiorStyles from "./barraSuperiorStyles";
import seta from '../../components/returnArrow/seta.png';
import userImg from './../../assets/userIcon.png'

function BarraSuperior({children, onLayout}){
    const navigation = useNavigation();
    if (children == 'Perfil'){
      return (
        <View style={barraSuperiorStyles.topBar} onLayout={onLayout} >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={seta} style={barraSuperiorStyles.returnArrow} />
          </TouchableOpacity>
          <Image style={barraSuperiorStyles.userIcon} source={userImg}></Image>
        </View>
      )
    }else{
      return (
        <View style={barraSuperiorStyles.topBar} onLayout={onLayout} >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={seta} style={barraSuperiorStyles.returnArrow} />
          </TouchableOpacity>
          <Text style={barraSuperiorStyles.topBarText}>{children}</Text>
        </View>
      )
    }
    

}
export default BarraSuperior;