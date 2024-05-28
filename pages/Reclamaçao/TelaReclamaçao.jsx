import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import seta from '../../components/returnArrow/seta.png';
import globalStyles from '../../styles/globalStyles';

const TelaReclamacao = ({ navigation }) => {
  return (
    <View style={estilos.container}>
      {/* Faixa verde no topo com seta para voltar e título */}
      <View style={globalStyles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../../components/returnArrow/seta.png')} style={globalStyles.returnArrow} />
        </TouchableOpacity>
        <Text style={globalStyles.topBarText}>Reclamação</Text>
      </View>

      {/* Caixas com imagens e texto */}
      <View style={estilos.conteudo}>
        <View style={estilos.caixaImagem}>
          <Image
           source={require('../../pages/Reclamaçao/Coruja.png')}
            style={estilos.imagem}
          />
          <Text style={estilos.textoCaixa}>S.O.E.</Text>
        </View>

        {/* Adicionei um espaço entre as caixas */}
        <View style={{ height: 20 }} />

        <View style={estilos.caixaImagem}>
          <Image
           source={require('../../pages/Reclamaçao/Coruja.png')} 
            style={estilos.imagem}
          />
          <Text style={estilos.textoCaixa}>S.O.P.</Text>
        </View>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#4CAF50', // Cor verde
  },
  seta: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  tituloTopBar: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  conteudo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixaImagem: {
    backgroundColor: '#fff',
    flexDirection: 'column', 
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#008000',
    borderWidth: 1,
    borderLeftColor: '#4CAF50',
    borderLeftWidth: 9,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '80%',
  },
  imagem: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  textoCaixa: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaReclamacao;