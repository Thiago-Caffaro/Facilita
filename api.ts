// Funções da rede social. Na versão original elas enviavam queries e mutations GraphQL
// para o AppSync (modelo Post em backend/amplify/data/resource.ts); no modo demonstração
// os posts ficam em memória, mas as respostas mantêm o mesmo formato do AppSync.
import { posts, type Post } from '@/services/demo/dados';
import { espera } from '@/services/demo/espera';

/**
 * Cria um novo post no banco de dados.
 *
 * @param {Object} postData - Esse objeto é o que deverá ser provisionado ao importar e usar a função
 * @param {string} postData.title - O título do post.
 * @param {string} postData.content - O conteúdo do post.
 * @param {string} postData.userName - O nome de quem publicou.
 * @param {string} postData.turma - A turma de quem publicou.
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
  await espera();
  const post: Post = {
    id: `post-${Date.now()}`,
    title: postData.title,
    content: postData.content,
    userName: postData.userName,
    turma: postData.turma,
    upvotes: postData.upvotes || 0,
    downvotes: postData.downvotes || 0,
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  return { data: { createPost: { ...post } } };
}

/**
 * Requisita todos os posts, do mais recente para o mais antigo.
 */
export async function getAllPosts() {
  await espera();
  const items = [...posts]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((post) => ({ ...post }));
  return { data: { listPosts: { items } } };
}

export async function updateVotes(postId: string, type: string) {
  await espera(200);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    console.error("Post not found or error in fetching post data");
    return;
  }

  // Na versão original, um 'ADD_upvote' também tirava um downvote sempre que o post
  // tivesse algum, mesmo que fosse de outro aluno. Quem troca de voto já chama o
  // 'REMOVE_' correspondente antes (veja handleVote em posts.jsx), então aqui cada tipo
  // mexe só no seu próprio contador.
  if (type === 'ADD_upvote') {
    post.upvotes += 1;
  } else if (type === 'REMOVE_upvote') {
    post.upvotes = Math.max(0, post.upvotes - 1); // Garante que não fique negativo
  } else if (type === 'ADD_downvote') {
    post.downvotes += 1;
  } else if (type === 'REMOVE_downvote') {
    post.downvotes = Math.max(0, post.downvotes - 1);
  }

  return { data: { updatePost: { ...post } } };
}
