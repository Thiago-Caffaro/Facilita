import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { router } from 'expo-router';
import globalStyles from '@/styles/globalStyles.js'
import recorveryStyles from '@/styles/recorveryStyles.js';

import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';

import { useEffect } from 'react';

function Redirect(){
  useEffect(() => {
    setTimeout(() => {
      router.push("(mainScreen)/main");
    }, 3000)
  }, [])
  return (
    <View style={recorveryStyles.container}>
      <View style={recorveryStyles.content}>
          <LogoFacilita tamanho={50} />
          <StatusBar style="light" />
          <Text 
            style={[globalStyles.text, {fontSize: 20}]}
          >
            Conta criada com sucesso!
          </Text>
      </View>
    </View>
  );
}

export default Redirect;