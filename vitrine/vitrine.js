// Vitrine da demonstração: mostra o app dentro de um celular e simula a caixa de entrada
// que recebia os emails do Cognito. O app avisa a vitrine com postMessage quando "envia"
// um email (veja services/demo/correio.ts).
(function () {
  const CHAVE_CAIXA = 'facilita-caixa-v1';
  const CHAVE_APP = 'facilita-demo-v1'; // mesma chave de services/demo/dados.ts

  const frame = document.getElementById('app-frame');
  const caixa = document.getElementById('caixa');
  const lista = document.getElementById('lista');
  const vazia = document.getElementById('vazia');
  const leitura = document.getElementById('leitura');
  const notificacao = document.getElementById('notificacao');
  const contador = document.getElementById('contador');
  const botaoCopiar = document.getElementById('copiar');

  let emails = carregar();
  let aberto = null;
  let tempoNotificacao;

  function carregar() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE_CAIXA)) || [];
    } catch {
      return [];
    }
  }

  function salvar() {
    try {
      localStorage.setItem(CHAVE_CAIXA, JSON.stringify(emails));
    } catch {
      // armazenamento bloqueado: a caixa funciona só enquanto a página estiver aberta
    }
  }

  function hora(iso) {
    return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  function desenharLista() {
    lista.replaceChildren();
    emails.forEach((email, indice) => {
      const item = document.createElement('li');
      const botao = document.createElement('button');
      botao.type = 'button';
      if (!email.lido) botao.classList.add('nao-lido');

      const ponto = document.createElement('span');
      ponto.className = 'ponto';
      const assunto = document.createElement('span');
      assunto.className = 'item-assunto';
      assunto.textContent = email.assunto;
      const quando = document.createElement('span');
      quando.className = 'item-hora';
      quando.textContent = hora(email.enviadoEm);
      const para = document.createElement('span');
      para.className = 'item-para';
      para.textContent = 'Para: ' + email.para;

      botao.append(ponto, assunto, quando, para);
      botao.addEventListener('click', () => abrir(indice));
      item.append(botao);
      lista.append(item);
    });

    const naoLidos = emails.filter((e) => !e.lido).length;
    contador.textContent = String(naoLidos);
    contador.hidden = naoLidos === 0;
    vazia.hidden = emails.length > 0 || aberto !== null;
    lista.hidden = aberto !== null;
  }

  function abrir(indice) {
    const email = emails[indice];
    email.lido = true;
    aberto = indice;
    salvar();

    document.getElementById('leitura-assunto').textContent = email.assunto;
    document.getElementById('leitura-para').textContent = email.para;

    // Destaca o código dentro do texto sem usar innerHTML
    const corpo = document.getElementById('leitura-corpo');
    corpo.replaceChildren();
    const partes = email.corpo.split(email.codigo);
    partes.forEach((parte, i) => {
      corpo.append(parte);
      if (i < partes.length - 1) {
        const codigo = document.createElement('span');
        codigo.className = 'codigo';
        codigo.textContent = email.codigo;
        corpo.append(codigo);
      }
    });

    botaoCopiar.textContent = 'Copiar código';
    leitura.hidden = false;
    desenharLista();
  }

  function fecharLeitura() {
    aberto = null;
    leitura.hidden = true;
    desenharLista();
  }

  function abrirCaixa() {
    caixa.classList.add('aberta');
  }

  function fecharCaixa() {
    caixa.classList.remove('aberta');
  }

  function notificar(email) {
    notificacao.textContent = '✉ Novo email: ' + email.assunto;
    notificacao.hidden = false;
    clearTimeout(tempoNotificacao);
    tempoNotificacao = setTimeout(() => (notificacao.hidden = true), 5000);
  }

  window.addEventListener('message', (evento) => {
    if (evento.origin !== location.origin || evento.source !== frame.contentWindow) return;
    const dados = evento.data;
    if (!dados || dados.tipo !== 'facilita-email' || !dados.email) return;

    const { para, assunto, corpo, codigo, enviadoEm } = dados.email;
    const email = { para: String(para), assunto: String(assunto), corpo: String(corpo), codigo: String(codigo), enviadoEm: String(enviadoEm), lido: false };
    emails.unshift(email);
    salvar();
    if (aberto !== null) aberto += 1;
    desenharLista();
    notificar(email);
  });

  notificacao.addEventListener('click', () => {
    notificacao.hidden = true;
    abrirCaixa();
    abrir(0);
  });

  botaoCopiar.addEventListener('click', async () => {
    if (aberto === null) return;
    try {
      await navigator.clipboard.writeText(emails[aberto].codigo);
      botaoCopiar.textContent = 'Código copiado!';
    } catch {
      botaoCopiar.textContent = 'Código: ' + emails[aberto].codigo;
    }
  });

  document.getElementById('voltar').addEventListener('click', fecharLeitura);
  document.getElementById('abrir-caixa').addEventListener('click', abrirCaixa);
  document.getElementById('fechar-caixa').addEventListener('click', fecharCaixa);

  document.getElementById('resetar').addEventListener('click', () => {
    try {
      localStorage.removeItem(CHAVE_APP);
      localStorage.removeItem(CHAVE_CAIXA);
    } catch {}
    emails = [];
    fecharLeitura();
    frame.src = 'app/';
  });

  // Ajusta o tamanho do celular para caber na altura da janela (descontando o topo e as margens)
  function ajustarEscala() {
    const escala = Math.min(1, Math.max(0.6, (window.innerHeight - 110) / 868));
    document.documentElement.style.setProperty('--escala', escala.toFixed(3));
  }
  window.addEventListener('resize', ajustarEscala);

  // No celular, o botão da caixa de entrada só aparece quando o app está visível
  const botaoCaixa = document.getElementById('abrir-caixa');
  new IntersectionObserver(([entrada]) => {
    botaoCaixa.classList.toggle('visivel', entrada.intersectionRatio > 0.5);
  }, { threshold: [0, 0.5, 1] }).observe(document.getElementById('app'));
  ajustarEscala();

  desenharLista();
})();
