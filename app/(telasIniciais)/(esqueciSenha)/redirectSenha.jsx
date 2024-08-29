import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { useContext } from 'react';
import { router } from 'expo-router';
import globalStyles from '@/styles/globalStyles.js'
import recorveryStyles from '@/styles/recorveryStyles.js';

import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';
import useChangeAttribute from '@/hooks/changeAtribute';

import { AuthContext } from '@/context/auth'
import { signOut } from 'aws-amplify/auth';
import { useEffect } from 'react';

function Redirect(){
  const changeAttribute = useChangeAttribute();
  const { email  } = useContext(AuthContext);

  useEffect(() => {
    changeAttribute(email, "custom:hasCompletedSingup", "completo"); // Atributo e valor que vai ser alterado
    setTimeout(() => {
      router.push("(telasIniciais)/login");
      signOut();
    }, 3500)
  }, [])
  return (
    <View style={recorveryStyles.container}>
      <View style={recorveryStyles.content}>
          <LogoFacilita tamanho={50} />
          <StatusBar style="light" />
          <Text 
            style={[globalStyles.text, {fontSize: 20}]}
          >
            Conta validada, você precisará fazer login com sua nova senha, redirecionando...
          </Text>
      </View>
    </View>
  );
}

export default Redirect;