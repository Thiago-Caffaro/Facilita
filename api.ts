import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource'; // Caminho do arquivo do esquema criado

const client = generateClient<Schema>({
  authMode: 'userPool',
});
export { client };

/**
 * Cria um novo post no banco de dados.
 *
 * @param {Object} postData - Esse objeto é o que deverá ser provisionado ao importar e usar a função
 * @param {string} postData.id - O ID do post.
 * @param {string} postData.title - O título do post.
 * @param {string} postData.content - O conte do do post.
 * @param {number} [postData.upvotes=0] - O número de likes no post.
 * @param {number} [postData.downvotes=0] - O número de dislikes no post.
 */
export default async function SendPost(postData: {
  title: string,
  content: string,
  userName: string,
  turma: string,
  upvotes?: number,
  downvotes?: number,
}) {
  const input = {
    title: postData.title,
    content: postData.content,
    userName: postData.userName,
    turma: postData.turma,
    upvotes: postData.upvotes || 0,
    downvotes: postData.downvotes || 0
  };
  try {
    const response = await client.graphql({
      query: `mutation createPost($input: CreatePostInput!) {
        createPost(input: $input) {
          id,
          title,
          content,
          userName,
          turma,
          upvotes,
          downvotes,
          createdAt
        }
      }`,
      variables: { input },
    });
    console.log("Response:", response);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Requisita todos os posts.
 */
export async function getAllPosts() {
  try {
    const response = await client.graphql({
      query: `query listPosts {
        listPosts {
          items {
            id,
            title,
            content,
            userName,
            turma,
            upvotes,
            downvotes,
            createdAt
          }
        }
      }`,
    });

    const posts = response || [];
    return posts;
  } catch (err) {
    console.error("Error fetching posts:", err);
    return [];
  }
}
export async function updateVotes(postId: string, type: string) {
  try {
    // Primeiro, obtenha o post para pegar os votos atuais
    const postResponse = await client.graphql({
      query: `query getPost($id: ID!) {
        getPost(id: $id) {
          id
          upvotes
          downvotes
        }
      }`,
      variables: { id: postId },
    });

    const post = postResponse?.data?.getPost;

    if (!post) {
      console.error("Post not found or error in fetching post data");
      return;
    }

    // Determine os novos valores de upvotes e downvotes
    let newUpvoteValue = post.upvotes;
    let newDownvoteValue = post.downvotes;

    // Se o tipo for 'ADD_upvote', incremente o upvote
    if (type === 'ADD_upvote') {
      newUpvoteValue += 1;
    }
    // Se o tipo for 'REMOVE_upvote', decremente o upvote
    else if (type === 'REMOVE_upvote') {
      newUpvoteValue = Math.max(0, newUpvoteValue - 1); // Garante que não fique negativo
    }
    // Se o tipo for 'ADD_downvote', incremente o downvote
    else if (type === 'ADD_downvote') {
      newDownvoteValue += 1;
    }
    // Se o tipo for 'REMOVE_downvote', decremente o downvote
    else if (type === 'REMOVE_downvote') {
      newDownvoteValue = Math.max(0, newDownvoteValue - 1); // Garante que não fique negativo
    }

    // Se o usuário estava votando com um tipo diferente, remova o voto antigo
    if (type === 'ADD_downvote' && post.upvotes > 0) {
      newUpvoteValue -= 1; // Remova um upvote se já houver
    } else if (type === 'ADD_upvote' && post.downvotes > 0) {
      newDownvoteValue -= 1; // Remova um downvote se já houver
    }

    const input = {
      id: postId,
      upvotes: newUpvoteValue,
      downvotes: newDownvoteValue,
    };

    const response = await client.graphql({
      query: `mutation updatePost($input: UpdatePostInput!) {
        updatePost(input: $input) {
          id
          title
          content
          userName
          turma
          upvotes
          downvotes
          createdAt
        }
      }`,
      variables: { input },
    });

    console.log("Response:", response);
  } catch (err) {
    console.error("Error updating votes:", err);
  }
}