import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, RefreshControl  } from 'react-native'; 
import { useFocusEffect } from '@react-navigation/native'; 
import { router } from 'expo-router'; 
import { getAllPosts, updateVotes } from '@/api'; 
import axios from 'axios'; 

// Componente funcional Posts
export default Posts = () => {
// Declaração de estado para armazenar posts e IDs dos posts curtidos
const [posts, setPosts] = useState([]);
const [likedPostsIds, setLikedPostsIds] = useState({ upVotes: [], downVotes: [] });
const [refreshing, setRefreshing] = useState(false);
// useEffect para buscar os posts curtidos quando o componente é montado
useEffect(() => {
  axios.post('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/getLikedPosts', {
    "matricula": "2210134300008" // Envia matrícula para obter os posts curtidos
  }).then(response => {
    if (!response.data.likedPostsIds) {
      console.log("Nenhum post curtido encontrado.");
    } else {
      setLikedPostsIds(response.data.likedPostsIds); // Atualiza o estado com os IDs dos posts curtidos
      console.log("likedPostsIds:", response.data.likedPostsIds); // Exibe os IDs no console
    }
  });
}, []); // Array vazio para garantir que seja chamado apenas uma vez na montagem

// Função para buscar todos os posts
const fetchPosts = async () => {
  const postsResponse = await getAllPosts(); // Chama a API para obter os posts
  setPosts(postsResponse.data.listPosts.items); // Atualiza o estado com a lista de posts
  console.log("Posts atualizados!"); // Log para confirmar que os posts foram atualizados
};
// useFocusEffect para buscar os posts quando o foco do componente
useFocusEffect(
  useCallback(() => {
    fetchPosts();
  }, [])
);

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
  if (likedPostsIds.upVotes.length > 0 || likedPostsIds.downVotes.length > 0) {// Se o array de IDs de posts curtidos não estiver vazio
    const alreadyLiked = likedPostsIds.upVotes.includes(postId);
    const alreadyDisliked = likedPostsIds.downVotes.includes(postId);
    try {
    // 1. Lógica para gerenciar os votos
    if (type === 0) { // Upvote
      if (alreadyLiked) {
        // Se já tiver upvotado, remover upvote
        await updateVotes(postId, 'REMOVE_upvote'); // Atualiza os votos no banco de dados
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return { ...post, upvotes: post.upvotes - 1 };
          }
          return post;
        }));
        // Atualiza likedPostsIds localmente
        setLikedPostsIds(prev => ({
          ...prev,
          upVotes: prev.upVotes.filter(id => id !== postId)
        }));
      } else if (alreadyDisliked) {
        // Se tiver downvotado, remover downvote e adicionar upvote
        await updateVotes(postId, 'REMOVE_downvote');
        await updateVotes(postId, 'ADD_upvote');
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return { 
              ...post, 
              upvotes: post.upvotes + 1, 
              downvotes: post.downvotes - 1 
            };
          }
          return post;
        }));
        // Atualiza likedPostsIds localmente
        setLikedPostsIds(prev => ({
          ...prev,
          upVotes: [...prev.upVotes, postId],
          downVotes: prev.downVotes.filter(id => id !== postId)
        }));
      }
    } else { // Downvote
      if (alreadyDisliked) {
        // Se já tiver downvotado, remover downvote
        await updateVotes(postId, 'REMOVE_downvote');
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return { ...post, downvotes: post.downvotes - 1 };
          }
          return post;
        }));
        // Atualiza likedPostsIds localmente
        setLikedPostsIds(prev => ({
          ...prev,
          downVotes: prev.downVotes.filter(id => id !== postId)
        }));
      } else if (alreadyLiked) {
        // Se tiver upvotado, remover upvote e adicionar downvote
        await updateVotes(postId, 'REMOVE_upvote');
        await updateVotes(postId, 'ADD_downvote');
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return { 
              ...post, 
              upvotes: post.upvotes - 1, 
              downvotes: post.downvotes + 1 
            };
          }
          return post;
        }));
        // Atualiza likedPostsIds localmente
        setLikedPostsIds(prev => ({
          ...prev,
          downVotes: [...prev.downVotes, postId],
          upVotes: prev.upVotes.filter(id => id !== postId)
        }));
      } else {
        // Adicionar downvote se não tiver votado antes
        await updateVotes(postId, 'ADD_downvote');
        setPosts(posts.map(post => {
          if (post.id === postId) {
            return { ...post, downvotes: post.downvotes + 1 };
          }
          return post;
        }));
        // Atualiza likedPostsIds localmente
        setLikedPostsIds(prev => ({
          ...prev,
          downVotes: [...prev.downVotes, postId]
        }));
      }
    }

    } catch (error) {
    console.error("Error processing votes:", error);
    }
  } else { // Se o array de IDs de posts curtidos estiver vazio
    // Adicionar upvote se não tiver votado antes
    await updateVotes(postId, 'ADD_upvote');
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, upvotes: post.upvotes + 1 };
      }
      return post;
    }));
    // Atualiza likedPostsIds localmente
    setLikedPostsIds(prev => ({
      ...prev,
      upVotes: [...prev.upVotes, postId]
    }));
  }

  // 2. Atualiza a coleção no MongoDB através da API
  await axios.post('https://ztuxhi3ry5.execute-api.us-east-1.amazonaws.com/app/addRemoveLikedPosts', {
    matricula: "2210134300008",
    postId: postId,
    type: type === 0 ? "upVote" : "downVote"
  });
  
};


// Renderização do componente
return (
  <ScrollView 
    contentContainerStyle={{ flexGrow: 1 }} style={localStyles.scrollViewStyle}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
  >
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => router.push('createPost')}>
        <Text>
          Área de postagem (Click)
        </Text>
      </TouchableOpacity>
      {posts && posts.map(post => ( // Mapeia os posts para exibir cada um
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
      ))}
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
