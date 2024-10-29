import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, RefreshControl  } from 'react-native'; 
import { useFocusEffect } from '@react-navigation/native'; 
import { router } from 'expo-router'; 
import { getAllPosts, updateVotes } from '@/api'; 
import { AuthContext } from '@/context/auth';
import { fetchUserAttributes } from 'aws-amplify/auth';
import axios from 'axios'; 
import { Loading } from '@/components/loadingComponent/loading';

// Componente funcional Posts
export default Posts = () => {
// Declaração de estado para armazenar posts e IDs dos posts curtidos
const [posts, setPosts] = useState();
const [likedPostsIds, setLikedPostsIds] = useState({ upVotes: [], downVotes: [] });
const [refreshing, setRefreshing] = useState(false);
const [localMatricula, setLocalMatricula] = useState('');
const [isRepresentante, setIsRepresentante] = useState(false);
// useEffect para buscar os posts curtidos quando o componente é montado com base na matricula do usuário
useEffect(() => {
  // Função para buscar posts curtidos com verificação
  const fetchLikedPostsIds = async () => {
    try {
      const attributes = await fetchUserAttributes();
      const matricula = attributes['custom:matricula'];

      // Seta as variáveis locais dos dados do aluno
      setLocalMatricula(matricula);
      if (attributes['custom:position'] == "representante") {
        setIsRepresentante(true);
      } else if (attributes['custom:position'] == "aluno") {
        setIsRepresentante(false);
      }
      
      const response = await axios.post('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/getLikedPosts', {
        matricula: matricula,
      });
      console.log(attributes);
      if (response.data.likedPostsIds) {
        setLikedPostsIds(response.data.likedPostsIds);
        console.log("likedPostsIds:", response.data.likedPostsIds);
      } else {
        console.log("Nenhum post curtido encontrado.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Chama a função ao montar o componente
  fetchLikedPostsIds();
}, []);

const fetchPosts = useCallback(async () => {
  try {
    const postsResponse = await getAllPosts();
    setPosts(postsResponse?.data?.listPosts?.items || []);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }
}, []);

useFocusEffect(
  useCallback(() => {
    fetchPosts();
  }, [fetchPosts])
);

useEffect(() => {
  setIsRepresentante(true);
}, []);

const onRefresh = useCallback(async () => {
  setRefreshing(true);
  await fetchPosts();
  setRefreshing(false);
}, []);

// useEffect para buscar posts ao montar o componente
useEffect(() => {
  fetchPosts(); 
}, []); // Array vazio para garantir que seja chamado apenas uma vez na montagem

// Função para lidar com a votação em posts
const handleVote = async (postId, type) => {
  const alreadyLiked = likedPostsIds.upVotes.includes(postId);
  const alreadyDisliked = likedPostsIds.downVotes.includes(postId);
  
  try {
    if (type === 0) { // Upvote
      if (alreadyLiked) {
        // Remover upvote
        await updateVotes(postId, 'REMOVE_upvote');
        setPosts(posts.map(post => post.id === postId ? { ...post, upvotes: post.upvotes - 1 } : post));
        setLikedPostsIds(prev => ({
          ...prev,
          upVotes: prev.upVotes.filter(id => id !== postId)
        }));
      } else {
        // Adicionar upvote e remover downvote se necessário
        if (alreadyDisliked) {
          await updateVotes(postId, 'REMOVE_downvote');
          setLikedPostsIds(prev => ({
            ...prev,
            downVotes: prev.downVotes.filter(id => id !== postId)
          }));
        }
        await updateVotes(postId, 'ADD_upvote');
        setPosts(posts.map(post => post.id === postId ? { ...post, upvotes: post.upvotes + 1, downvotes: post.downvotes - (alreadyDisliked ? 1 : 0) } : post));
        setLikedPostsIds(prev => ({
          ...prev,
          upVotes: [...prev.upVotes, postId]
        }));
      }
    } else if (type === 1) { // Downvote
      if (alreadyDisliked) {
        // Remover downvote
        await updateVotes(postId, 'REMOVE_downvote');
        setPosts(posts.map(post => post.id === postId ? { ...post, downvotes: post.downvotes - 1 } : post));
        setLikedPostsIds(prev => ({
          ...prev,
          downVotes: prev.downVotes.filter(id => id !== postId)
        }));
      } else {
        // Adicionar downvote e remover upvote se necessário
        if (alreadyLiked) {
          await updateVotes(postId, 'REMOVE_upvote');
          setLikedPostsIds(prev => ({
            ...prev,
            upVotes: prev.upVotes.filter(id => id !== postId)
          }));
        }
        await updateVotes(postId, 'ADD_downvote');
        setPosts(posts.map(post => post.id === postId ? { ...post, upvotes: post.upvotes - (alreadyLiked ? 1 : 0), downvotes: post.downvotes + 1 } : post));
        setLikedPostsIds(prev => ({
          ...prev,
          downVotes: [...prev.downVotes, postId]
        }));
      }
    }
    
    // Atualiza a coleção no MongoDB
    await axios.post('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/addRemoveLikedPosts', {
      matricula: localMatricula || null,
      postId,
      type: type === 0 ? "upVote" : "downVote"
    });
    console.log("Atualizado com sucesso. PostId:", postId);
  } catch (error) {
    console.error("Erro ao processar votos:", error);
  }
};



// Renderização do componente
return (
  <ScrollView 
    contentContainerStyle={{ flexGrow: 1 }} style={localStyles.scrollViewStyle}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  >
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isRepresentante ? <TouchableOpacity onPress={() => router.push('createPost')}>
        <Text>
          Área de postagem (Click)
        </Text>
      </TouchableOpacity> : null}
      {posts ? posts.map(post => ( // Mapeia os posts para exibir cada um
        <View key={post.id} style={[localStyles.postBoxStyle, likedPostsIds.upVotes.includes(post.id) ? styles.upvoted : likedPostsIds.downVotes.includes(post.id) ? styles.downvoted : null]}>
          <Text>{post.title}</Text>
          <Text>{post.content}</Text>
          <Text>Upvotes: {post.upvotes}</Text> 
          <Text>Downvotes: {post.downvotes}</Text>
          <TouchableOpacity onPress={() => handleVote(post.id, 0)}> 
            <Text style={styles.voteButton}>👍 Upvote</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleVote(post.id, 1)}> 
            <Text style={styles.voteButton}>👎 Downvote</Text>
          </TouchableOpacity>
        </View>
      )) : <Loading />}
    </View>
  </ScrollView>
);
};

// Estilos locais para o componente
const localStyles = StyleSheet.create({
postBoxStyle: {
  margin: 10,
  padding: 10,
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#000', // Cor da borda dos posts
},
scrollViewStyle:{
  marginTop: 50 // Margem superior para a ScrollView
}
});

// Estilos gerais
const styles = StyleSheet.create({
voteButton: {
  marginTop: 5, // Margem superior para os botões de voto
  color: '#007BFF', // Cor do texto do botão
  textDecorationLine: 'underline', // Texto sublinhado para indicar que é clicável
},
upvoted: {
  backgroundColor: 'green', // Cor de fundo para os posts curtidos
  color: 'white', // Cor do texto para os posts curtidos
},
downvoted: {
  backgroundColor: 'red', // Cor de fundo para os posts descurtidos
  color: 'white', // Cor do texto para os posts descurtidos
}}
);
