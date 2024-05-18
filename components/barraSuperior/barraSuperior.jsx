import { TouchableOpacity, Text, View, Image } from "react-native"
import { useNavigation } from '@react-navigation/native';

import barraSuperiorStyles from "./barraSuperiorStyles";
import seta from '../../components/returnArrow/seta.png';

function BarraSuperior(props){
    const navigation = useNavigation();

    return (
      <View style={barraSuperiorStyles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={seta} style={barraSuperiorStyles.returnArrow} />
        </TouchableOpacity>
        <Text style={barraSuperiorStyles.topBarText}>{props.children}</Text>
      </View>
    )

}
export default BarraSuperior;