// Simulação local da API Gateway + Lambdas (veja backend/lambdas).
// Cada rota reproduz a lógica da Lambda original, mas lendo os dados fictícios
// em services/demo/dados.ts em vez do MongoDB Atlas.
// A interface imita o axios (api.get / api.post devolvem { data }) para os hooks mudarem o mínimo.
import {
  alunos,
  cardapio,
  gradesHorarias,
  registrosFrequencia,
  likedPosts,
  MATRICULA_REFERENCIA,
} from '@/services/demo/dados';
import { espera } from '@/services/demo/espera';

type Body = Record<string, any>;

const rotas: Record<string, (body: Body) => object> = {
  // backend/lambdas/getCardapio
  '/getCardapio': () => ({ success: true, cardapio }),

  // backend/lambdas/getAluno
  '/getAluno': (body) => {
    const aluno = alunos.find((a) => a.matricula === Math.floor(parseInt(body.matricula)));
    return aluno
      ? { success: true, message: 'Aluno encontrado!', alunoData: { aluno } }
      : { success: false, message: 'Aluno não encontrado!', alunoData: null };
  },

  // backend/lambdas/getGradeHoraria
  '/getGradeHoraria': (body) => {
    const gradeHoraria = gradesHorarias.find((g) => g.Turma === body.turma);
    return gradeHoraria
      ? { success: true, gradeHoraria }
      : { success: false, message: 'Falha ao encontrar grade-horária' };
  },

  // backend/lambdas/getFrequencia
  '/getFrequencia': (body) => {
    const matricula = parseInt(body.matricula);
    const diasLetivos = registrosFrequencia.filter((r) => r.matricula === MATRICULA_REFERENCIA).length;
    const presencas = registrosFrequencia.filter((r) => r.matricula === matricula).length;
    return { success: true, message: 'Frequência encontrada!', presencas, faltas: diasLetivos - presencas };
  },

  // backend/lambdas/getLikedPosts
  '/getLikedPosts': (body) => {
    const ids = likedPosts[Math.floor(parseInt(body.matricula))];
    return ids
      ? { success: true, message: 'Posts encontrados!', likedPostsIds: ids }
      : { success: false, message: 'Posts não encontrados!', likedPostsIds: null };
  },

  // backend/lambdas/addRemoveLikedPosts
  '/addRemoveLikedPosts': (body) => {
    const matricula = Math.floor(parseInt(body.matricula));
    const { postId, type } = body;
    const ids = likedPosts[matricula] || { upVotes: [], downVotes: [] };

    // Na Lambda original, votar "downVote" num post já com downvote virava upvote.
    // Aqui o voto do mesmo tipo desfaz o voto, e o do tipo oposto troca de lado.
    const [mesmoLado, outroLado] = type === 'upVote' ? ['upVotes', 'downVotes'] as const : ['downVotes', 'upVotes'] as const;
    if (ids[mesmoLado].includes(postId)) {
      ids[mesmoLado] = ids[mesmoLado].filter((id) => id !== postId);
    } else {
      ids[outroLado] = ids[outroLado].filter((id) => id !== postId);
      ids[mesmoLado].push(postId);
    }
    likedPosts[matricula] = ids;
    return { success: true, message: 'Operação realizada com sucesso!' };
  },
};

async function chamar(rota: string, body: Body = {}) {
  await espera();
  const handler = rotas[rota];
  if (!handler) throw new Error(`Rota ${rota} não existe na API de demonstração`);
  // JSON.parse/stringify imita a serialização da rede e evita que a tela altere os dados "do servidor"
  return { data: JSON.parse(JSON.stringify(handler(body))) };
}

const api = {
  get: (rota: string) => chamar(rota),
  post: (rota: string, body: Body) => chamar(rota, body),
};

export default api;
