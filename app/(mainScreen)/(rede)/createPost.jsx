import { Text, View, StyleSheet, TouchableOpacity, TextInput, useCallback } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import { router } from 'expo-router';
import { useState } from 'react';

import requerirAlunoData from '@/hooks/requerirDados';

import SendPost from '@/api';

export default CreatePosts = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmitPost = async () => {
        const userData = await requerirAlunoData();

        await SendPost({
            title: title,
            content: content,
            userName: userData.nomeAluno,
            turma: userData.turmaAluno
        })
        router.back();
    }
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
            <TextInput style={localStyles.input} placeholder="Título"  value={title} onChangeText={setTitle}></TextInput>
            <TextInput style={localStyles.input} placeholder="Conteúdo"  value={content} onChangeText={setContent}></TextInput>

            <TouchableOpacity style={localStyles.button} onPress={() => handleSubmitPost()}>
                <Text style={{color: '#fff'}}>Criar post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={localStyles.button} onPress={() => router.back()}>
                <Text style={{color: '#fff'}}>Voltar</Text>
            </TouchableOpacity>

        </View>
    );
};

const localStyles = StyleSheet.create({

    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
    button:{
        height: 40,
        width: 100,
        marginBottom: 10,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }
    
  })