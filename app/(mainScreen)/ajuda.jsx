import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import SetaSuperior from '@/components/setaSuperior/setaSuperior';
import { Ionicons } from '@expo/vector-icons';

import BarraSuperior from '@/components/barraSuperior/barraSuperior.jsx';
import ajudaStyles from '@/styles/ajudaStyles.js';

// Importe imagens usando um caminho relativo ou um pacote como `react-native-svg`
import setabaixo from '@/assets/icons/setabaixo.png';

export default Ajuda = () => {

  // Defina um array de perguntas e respostas
  const perguntas = [
    {
      question: 'Qual é a minha matrícula?',
      answer: 'Você pode consultar tanto no seu perfil, clicando no ícone de uma pessoa, quanto na secretaria da sua escola.',
    },
    {
      question: 'Como recupero minha senha?',
      answer: 'Na página de login, clique em "Esqueci Minha Senha" e siga todas as estapas necessárias e solicitadas.',
    },
    {
      question: 'Aonde vejo minhas faltas?',
      answer: 'Acesse a aba "Frequência" e lá terá as suas faltasatualizadas.',
    },
    {
      question: 'É possível trocar a foto de perfil?',
      answer: 'Sim! Primeiro acesse o menu perfil e clique no ícone com um formato de um lápis, e escolha a imagem da sua galeria.',
    },
    {
      question: 'Como vejo o horário da minha turma?',
      answer: 'Na aba "Grade-Horária" utilize o filtro de turmas e selecione a sua respectiva turma.',
    },
    {
      question: 'Consigo trocar o tema do app?',
      answer: 'Sim! Acesse o menu configurações cujo ícone é uma engrenagem, clique em tema e depois escolha o tema de sua preferência.',
    },
    {
      question: 'Como funciona o chat do SOE e SOP?',
      answer: 'É um chat no qual apenas os representantes de turma tem acesso, e lá eles podem relatar algo que aconteceu com a turma ou dar sugestões de melhorias.',
    },
    {
      question: 'Como vejo meu horário nos outros dias? ',
      answer: 'Arraste sua tela para o lado esquerdo caso queira avançar um dia, e para voltar um dia arraste sua tela para o lado direito.',
    },
  ];

  // Inicialize um array de booleanos para acompanhar o estado expandido
  const [expanded, setExpanded] = useState(new Array(perguntas.length).fill(false));

  // Alterne o estado expandido para uma pergunta específica
  const handleToggle = (index) => {
    setExpanded(expanded.map((item, i) => (i === index ? !item : item)));
  };

  return (
    <View style={ajudaStyles.container}>
      <BarraSuperior>  Ajuda</BarraSuperior>
      <SetaSuperior/>
      {/* Conteúdo rolável com itens de FAQ */}
      <ScrollView style={ajudaStyles.content}>
      <Text style={ajudaStyles.h1}>Como Podemos Ajudar?</Text>
        {perguntas.map((item, index) => (
          <View key={index} style={ajudaStyles.faqItem}>
            {/* Container de pergunta com botão de toggle */}
            <TouchableOpacity onPress={() => handleToggle(index)}>
              <View style={ajudaStyles.questionContainer}>
                <Text style={ajudaStyles.question}>{item.question}</Text>
                <Image
                  source={setabaixo}
                  style={[ajudaStyles.arrow, expanded[index] && ajudaStyles.arrowRotated]}
                />
              </View>
            </TouchableOpacity>
            {/* Texto de resposta, apenas visível quando expandido */}
            {expanded[index] && (
              <Text style={ajudaStyles.answer}>{item.answer}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

