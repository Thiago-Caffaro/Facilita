import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { router } from 'expo-router';
import globalStyles from '@/styles/globalStyles.js'
import recorveryStyles from '@/styles/recorveryStyles.js';

import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';
import { updateUserAttribute, getCurrentUser } from '@aws-amplify/auth';

import { useEffect } from 'react';

function Redirect(){
  useEffect(() => {
    // Chama a função para atualizar o atributo customizado
    async function atualizarAtributo() {
      const user = await getCurrentUser();

    // Atualiza o atributo customizado
      await updateUserAttribute({
          user: user,
          userAttribute: { 
              attributeKey: 'custom:hasCompletedSingup',
              value: 'completo',
          }
      })
      setTimeout(() => {
        router.push("(mainScreen)/main");
      }, 3000)
    }
    atualizarAtributo();
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