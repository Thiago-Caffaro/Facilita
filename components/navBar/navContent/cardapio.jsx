import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import mainScreenStyles from './mainWindow.js';
import cardapioStyles from '@/styles/cardapioStyles.js';
import useGetCardapio from '@/hooks/getCardapio.ts';

function Cardapio() {
  const [cardapio, setCardapio] = useState(null);
  const getCardapio = useGetCardapio();
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await getCardapio();
        setCardapio(response);
      } catch (error) {
        console.error('Erro ao obter o cardápio:', error);
      }
    };

    fetchData();
  }, []);

  if (!cardapio) {
    return <Text>Loading...</Text>;
  }

  const cardapioData = {
    Dia1: cardapio.Dia1,
    Dia2: cardapio.Dia2,
    Dia3: cardapio.Dia3,
    Dia4: cardapio.Dia4,
    Dia5: cardapio.Dia5,
  };

  return (
    <View id="container">
      <View id="content" style={cardapioStyles.content}>
        {Object.keys(cardapioData).map((key) => {
          console.log(
            cardapioData[key].base
              
          )
          return (
            <View key={key}>
              <View  style={[cardapioStyles.line]} />
              <Text style={cardapioStyles.title}>{cardapioData[key].diaSemana}</Text>
              <Text style={cardapioStyles.infos}>
                {cardapioData[key].base}
                {'\n'}
                {cardapioData[key].main}
                {'\n'}
                {cardapioData[key].acompanhamento}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default Cardapio;