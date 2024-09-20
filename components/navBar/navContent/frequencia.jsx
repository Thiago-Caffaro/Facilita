import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import Carregamento from '@/components/carregamento/carregamento';
import frequenciaStyles from '@/styles/frequenciaStyles.js';
import useGetFreq from '@/hooks/getFreq.ts';

function Frequencia() {
  const [frequencia, setFrequencia] = useState(null);
  const getFreq = useGetFreq();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFreq();
        setFrequencia(response.data);
        
      } catch (error) {
        console.error('Erro ao obter a frequência:', error);
      }
    };

    fetchData();
  }, []);

  if (!frequencia) {
    return <Carregamento/>;
  }

  const freqData = {
    faltas: frequencia.faltas || 0,  // Valor padrão
    presencas: frequencia.presencas || 0,  // Valor padrão
  };

  return (
      <View style={frequenciaStyles.content}>
        <View style={frequenciaStyles.line}/>
        <Text style={frequenciaStyles.title}>Faltas</Text>
        <Text style={frequenciaStyles.infos}>{freqData.faltas}</Text>
        
        <View style={frequenciaStyles.line}/>
        <Text style={frequenciaStyles.title}>Presenças</Text>
        <Text style={frequenciaStyles.infos}>{freqData.presencas}</Text>
        <View style={frequenciaStyles.line}/>
      </View>
  );
}

export default Frequencia;
