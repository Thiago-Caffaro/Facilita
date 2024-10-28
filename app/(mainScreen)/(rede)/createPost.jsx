import { Text, View, StyleSheet, TouchableOpacity, TextInput, useCallback } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import { router } from 'expo-router';
import { useState } from 'react';

import SendPost from '@/api';

export default CreatePosts = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmitPost = async () => {
        await SendPost({
            title: title,
            content: content,
        })
        router.back();
    }
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
            <TextInput style={localStyles.input} placeholder="title"  value={title} onChangeText={setTitle}></TextInput>
            <TextInput style={localStyles.input} placeholder="content"  value={content} onChangeText={setContent}></TextInput>

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
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },
    button:{
        height: 40,
        width: 100,
        marginBottom: 10,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }
    
  })