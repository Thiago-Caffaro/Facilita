import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Image  } from 'react-native'; 
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
  <View style={localStyles.container}>
    {isRepresentante ? 
    <View>
      <Text style={localStyles.repTitle}>{isRepresentante ? "Representante" : "Aluno"} </Text> 
      <TouchableOpacity 
        style={localStyles.postButton} 
        onPress={() => router.push('createPost')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>+</Text>
      </TouchableOpacity>
      </View> 
    : null}
    <ScrollView 
  contentContainerStyle={{ flexGrow: 1 }} 
  style={[localStyles.scrollViewStyle, { position: 'relative' }]} // Adicione position: 'relative' aqui
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
>
  <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
    

    {posts ? posts.map(post => ( // Mapeia os posts para exibir cada um
      <View key={post.id} style={[localStyles.postBoxStyle]}>
        <View style={localStyles.usernameBox}>
          <Image style={localStyles.userImage} source={require('@/assets/icons/icons8-user-48.png')} />
          <Text style={localStyles.username}>{post.userName}</Text>
          <Text style={localStyles.turma}>{post.turma}</Text>
        </View>
        
        <View style={localStyles.innerPostBoxStyle}>
          <Text style={localStyles.title}>{post.title}</Text>
          <Text style={localStyles.postText}>{post.content}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={[localStyles.voteButton, likedPostsIds.upVotes.includes(post.id) ? localStyles.upVoted : null]}>
            <TouchableOpacity onPress={() => handleVote(post.id, 0)}> 
              <Image style={{ height: 25, width: 25 }} source={require('@/assets/icons/like.png')} />
            </TouchableOpacity>
          </View>
          <Text style={localStyles.voteText}>{post.upvotes - post.downvotes}</Text> 
          <View style={[localStyles.voteButton, likedPostsIds.downVotes.includes(post.id) ? localStyles.downVoted : null]}>
            <TouchableOpacity onPress={() => handleVote(post.id, 1)}> 
              <Image style={{ height: 25, width: 25 }} source={require('@/assets/icons/dislike.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )) : <Loading />}
  </View>
</ScrollView>
  </View>
  
);
};

// Estilos locais para o componente
const localStyles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  repTitle: {
    width: '100%',
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  postBoxStyle: {
    width: '90%',
    marginBottom: 30,
  },
  username: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    marginRight: 10,

  },
  turma: {
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
  },
  usernameBox: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  innerPostBoxStyle: {
    padding: 15,

    borderRadius: 10,
    backgroundColor: 'green',
  },
  postButton: {
    position: 'absolute', 
    zIndex: 1, 
    top: 5, 
    right: 10, 
    backgroundColor: 'green', 
    padding: 10, 
    borderRadius: 50, 
    elevation: 5,
  },  
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  postText: {
    color: 'white',
  },
  scrollViewStyle:{
    marginTop: 30
  },
  voteButton: {
    marginTop: 5,
    
    color: '#007BFF',
    borderRadius: 50,
    borderBlockColor: 'green',
    borderWidth: 2,
    textAlign: 'center',
    padding: 8,
    textDecorationLine: 'underline',
  },
  voteText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10
  },
  upVoted: {
    backgroundColor: '#90EE90', 
    color: 'white',
  },
  downVoted: {
    backgroundColor: '#FF474C', 
    color: 'white',
  },
});
