import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import mainScreenStyles from './mainWindow.js';
import cardapioStyles from '@/styles/cardapioStyles.js';
import getCardapio from '@/hooks/getCardapio.ts';

function Cardapio({}) {
    if (!navigation) {
        console.error("Navigation prop is undefined!");
        return null;
    }
  const [cardapioData, setCardapioData] = useState(null);

  useEffect(() => {
    const loadCardapio = async () => {
      const cardapio = await getCardapio();
      const cardapioPoggers = {
        Dia1: cardapio.Dia1,
        Dia2: cardapio.Dia2,
        Dia3: cardapio.Dia3,
        Dia4: cardapio.Dia4,
        Dia5: cardapio.Dia5,
      };
      setCardapioData(cardapioPoggers);
    };
    loadCardapio();
  }, []);

  return (
    <View id="container">
      {cardapioData ? (
        <View id="content" style={cardapioStyles.content}>
          {Object.keys(cardapioData).map((key) => {
            return (
              <View style={[cardapioStyles.line]} key={key}>
                <Text style={cardapioStyles.title}>{cardapioData[key].title}</Text>
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
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

export default Cardapio;