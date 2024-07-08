import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

import Coruja from '@/assets/Coruja.png'
import { useState } from 'react';
const chat = () => {
  const otherUserId1 = "chats/34d89468-40f1-70dd-78ed-f35475a1ae0b"
  const otherUserId2 = "chats/34d89468-40f1-70dd-78ed-f35475a1ae0b"//id do pedro

  return (
    <View style={estilos.container}>      
      <View style={estilos.conteudo}>
        <Link href={otherUserId1} style={[estilos.caixaImagem, {textAlign: 'center'}]}>
          <View>
            <Image
              source={Coruja}
              style={estilos.imagem}
            />
            <Text style={estilos.textoCaixa}>S.O.E</Text>
          </View>
        </Link>
        <View style={{ height: 20 }} />
        <Link href={otherUserId2} style={[estilos.caixaImagem, {textAlign: 'center'}]}>
          <View>
            <Image
              source={Coruja}
              style={estilos.imagem}
            />
            <Text style={estilos.textoCaixa}>S.O.P</Text>
          </View>
        </Link>
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default chat;