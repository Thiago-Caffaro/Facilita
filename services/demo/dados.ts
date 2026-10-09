// Dados fictícios usados no modo demonstração.
// Os formatos seguem os documentos que ficavam nas coleções do MongoDB Atlas
// (alunos, cardapio, gradeHoraria, frequencia, likedPosts) e o modelo Post do AppSync.
// Usuários, posts, votos e a sessão ficam salvos no localStorage (veja o fim do arquivo).

export const contaDemo = {
  email: 'demo@facilita.app',
  senha: 'Facilita123',
};

export const alunos = [
  { matricula: 2024001, nome: 'Ana Beatriz Souza', turma: '3001', numero: 4 },
  { matricula: 2024002, nome: 'Lucas Oliveira Lima', turma: '3001', numero: 21 },
  { matricula: 2024003, nome: 'Mariana Costa Ribeiro', turma: '3002', numero: 17 },
  { matricula: 2024004, nome: 'Rafael Mendes Pereira', turma: '3002', numero: 25 },
];

// Usuários do "Cognito" de demonstração
export type UsuarioDemo = {
  email: string;
  senha: string;
  sub: string;
  confirmado: boolean;
  atributos: Record<string, string>;
  // Últimos códigos enviados por email (no Cognito eles ficam guardados no servidor)
  codigoConfirmacao?: string;
  codigoRecuperacao?: string;
};

export const usuarios: UsuarioDemo[] = [
  {
    email: contaDemo.email,
    senha: contaDemo.senha,
    sub: 'demo-0000-0001',
    confirmado: true,
    atributos: {
      'custom:matricula': '2024001',
      'custom:position': 'representante',
      'custom:hasCompletedSingup': 'completo',
    },
  },
];

// O cardápio usa as datas da semana atual para a demonstração não parecer parada no tempo
function cardapioDaSemana() {
  const nomes = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
  const pratos = [
    { base: 'Arroz e feijão', main: 'Frango grelhado', acompanhamento: 'Salada de alface e tomate' },
    { base: 'Arroz e feijão preto', main: 'Carne moída com batata', acompanhamento: 'Farofa' },
    { base: 'Macarrão', main: 'Almôndegas ao molho', acompanhamento: 'Legumes refogados' },
    { base: 'Arroz parboilizado e feijão', main: 'Peixe empanado', acompanhamento: 'Purê de batata' },
    { base: 'Arroz e feijão', main: 'Estrogonofe de frango', acompanhamento: 'Batata palha' },
  ];
  const hoje = new Date();
  const segunda = new Date(hoje);
  segunda.setDate(hoje.getDate() - ((hoje.getDay() + 6) % 7));

  const cardapio: Record<string, { diaSemana: string; base: string; main: string; acompanhamento: string }> = {};
  nomes.forEach((nome, i) => {
    const dia = new Date(segunda);
    dia.setDate(segunda.getDate() + i);
    const data = `${String(dia.getDate()).padStart(2, '0')}/${String(dia.getMonth() + 1).padStart(2, '0')}`;
    cardapio[`Dia${i + 1}`] = { diaSemana: `${nome} (${data})`, ...pratos[i] };
  });
  return cardapio;
}

export const cardapio = cardapioDaSemana();

type Dia = Record<string, string>;
function dia(materias: [string, string][]): Dia {
  const tempos = ['primeiro', 'segundo', 'terceiro', 'quarto', 'quinto', 'sexto'];
  const resultado: Dia = {};
  materias.forEach(([materia, professor], i) => {
    resultado[`${tempos[i]}Tempo`] = materia;
    resultado[`${tempos[i]}Professor`] = professor;
  });
  return resultado;
}

export const gradesHorarias = [
  {
    Turma: '3001',
    Segunda: dia([['Matemática', 'Prof. Carlos'], ['Programação Mobile', 'Prof.ª Renata'], ['Programação Mobile', 'Prof.ª Renata'], ['Português', 'Prof.ª Helena'], ['Física', 'Prof. Márcio'], ['Inglês', 'Prof.ª Juliana']]),
    Terca: dia([['Banco de Dados', 'Prof. André'], ['Banco de Dados', 'Prof. André'], ['História', 'Prof. Paulo'], ['Matemática', 'Prof. Carlos'], ['Educação Física', 'Prof. Diego'], ['Sociologia', 'Prof.ª Lívia']]),
    Quarta: dia([['Redes de Computadores', 'Prof. Fábio'], ['Redes de Computadores', 'Prof. Fábio'], ['Português', 'Prof.ª Helena'], ['Química', 'Prof.ª Sônia'], ['Engenharia de Software', 'Prof.ª Renata'], ['Engenharia de Software', 'Prof.ª Renata']]),
    Quinta: dia([['Física', 'Prof. Márcio'], ['Matemática', 'Prof. Carlos'], ['Sistemas Operacionais', 'Prof. André'], ['Sistemas Operacionais', 'Prof. André'], ['Geografia', 'Prof. Paulo'], ['Filosofia', 'Prof.ª Lívia']]),
    Sexta: dia([['Programação Web', 'Prof. Fábio'], ['Programação Web', 'Prof. Fábio'], ['Inglês', 'Prof.ª Juliana'], ['Biologia', 'Prof.ª Sônia'], ['Projeto Integrador', 'Prof.ª Renata'], ['Projeto Integrador', 'Prof.ª Renata']]),
    Sabado: dia([['Reposição', 'Coordenação'], ['Reposição', 'Coordenação'], ['Monitoria', 'Prof. Carlos'], ['Monitoria', 'Prof. André']]),
  },
  {
    Turma: '3002',
    Segunda: dia([['Português', 'Prof.ª Helena'], ['Matemática', 'Prof. Carlos'], ['Banco de Dados', 'Prof. André'], ['Banco de Dados', 'Prof. André'], ['Inglês', 'Prof.ª Juliana'], ['Física', 'Prof. Márcio']]),
    Terca: dia([['Programação Mobile', 'Prof.ª Renata'], ['Programação Mobile', 'Prof.ª Renata'], ['Matemática', 'Prof. Carlos'], ['História', 'Prof. Paulo'], ['Sociologia', 'Prof.ª Lívia'], ['Educação Física', 'Prof. Diego']]),
    Quarta: dia([['Química', 'Prof.ª Sônia'], ['Português', 'Prof.ª Helena'], ['Engenharia de Software', 'Prof.ª Renata'], ['Engenharia de Software', 'Prof.ª Renata'], ['Redes de Computadores', 'Prof. Fábio'], ['Redes de Computadores', 'Prof. Fábio']]),
    Quinta: dia([['Sistemas Operacionais', 'Prof. André'], ['Sistemas Operacionais', 'Prof. André'], ['Física', 'Prof. Márcio'], ['Matemática', 'Prof. Carlos'], ['Filosofia', 'Prof.ª Lívia'], ['Geografia', 'Prof. Paulo']]),
    Sexta: dia([['Biologia', 'Prof.ª Sônia'], ['Inglês', 'Prof.ª Juliana'], ['Programação Web', 'Prof. Fábio'], ['Programação Web', 'Prof. Fábio'], ['Projeto Integrador', 'Prof.ª Renata'], ['Projeto Integrador', 'Prof.ª Renata']]),
    Sabado: dia([['Reposição', 'Coordenação'], ['Reposição', 'Coordenação'], ['Monitoria', 'Prof.ª Renata'], ['Monitoria', 'Prof. Fábio']]),
  },
];

// No sistema real, cada leitura do crachá no leitor de código de barras (programa em Python)
// gerava um documento { matricula, data } na coleção "frequencia".
// A Lambda getFrequencia contava os documentos de uma matrícula de referência
// (que "comparecia" todo dia letivo) para saber o total de dias.
export const MATRICULA_REFERENCIA = 123123123;
const DIAS_LETIVOS = 62;
const presencasPorAluno: Record<number, number> = { 2024001: 58, 2024002: 51, 2024003: 60, 2024004: 47 };

export const registrosFrequencia: { matricula: number; dia: number }[] = [];
for (let d = 1; d <= DIAS_LETIVOS; d++) {
  registrosFrequencia.push({ matricula: MATRICULA_REFERENCIA, dia: d });
  for (const [matricula, presencas] of Object.entries(presencasPorAluno)) {
    if (d <= presencas) registrosFrequencia.push({ matricula: Number(matricula), dia: d });
  }
}

export type Post = {
  id: string;
  userName: string;
  turma: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
};

const diasAtras = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();

export const posts: Post[] = [
  {
    id: 'post-1',
    userName: 'Mariana Costa Ribeiro',
    turma: '3002',
    title: 'Bebedouro do 2º andar',
    content: 'O bebedouro perto da sala 204 está sem água gelada há duas semanas. Alguém sabe se já avisaram a direção?',
    upvotes: 14,
    downvotes: 0,
    createdAt: diasAtras(1),
  },
  {
    id: 'post-2',
    userName: 'Lucas Oliveira Lima',
    turma: '3001',
    title: 'Sugestão para o cardápio',
    content: 'Seria legal ter uma opção vegetariana pelo menos duas vezes por semana.',
    upvotes: 9,
    downvotes: 2,
    createdAt: diasAtras(3),
  },
  {
    id: 'post-3',
    userName: 'Rafael Mendes Pereira',
    turma: '3002',
    title: 'Horário da biblioteca',
    content: 'A biblioteca poderia abrir no intervalo do almoço? Muita gente precisa imprimir trabalho nesse horário.',
    upvotes: 6,
    downvotes: 1,
    createdAt: diasAtras(6),
  },
];

// Coleção likedPosts: quais posts cada matrícula votou
export const likedPosts: Record<number, { upVotes: string[]; downVotes: string[] }> = {
  2024001: { upVotes: ['post-1'], downVotes: [] },
};

// Persistência: na versão web o estado da demonstração sobrevive a recarregar a página.
// No celular (Expo Go) não existe localStorage, então tudo fica só na memória.
export const CHAVE_ARMAZENAMENTO = 'facilita-demo-v1';

// Email do usuário logado; no app real a sessão ficava guardada pelo Amplify
export const sessao: { email: string | null } = { email: null };

function armazenamento(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null; // navegação anônima ou armazenamento bloqueado
  }
}

export function salvarEstado() {
  try {
    armazenamento()?.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify({ usuarios, posts, likedPosts, sessao }));
  } catch {
    // sem espaço ou bloqueado: a demonstração continua funcionando só em memória
  }
}

function carregarEstado() {
  try {
    const salvo = armazenamento()?.getItem(CHAVE_ARMAZENAMENTO);
    if (!salvo) return;
    const estado = JSON.parse(salvo);
    usuarios.splice(0, usuarios.length, ...estado.usuarios);
    posts.splice(0, posts.length, ...estado.posts);
    for (const chave of Object.keys(likedPosts)) delete likedPosts[Number(chave)];
    Object.assign(likedPosts, estado.likedPosts);
    sessao.email = estado.sessao?.email ?? null;
  } catch {
    // estado salvo inválido: começa do zero
  }
}

carregarEstado();
