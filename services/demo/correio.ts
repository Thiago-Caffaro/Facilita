// Envio de emails da demonstração. No sistema real quem mandava os emails era o Cognito
// (confirmação de cadastro e recuperação de senha); aqui eles vão para a caixa de entrada
// fictícia da vitrine (vitrine/index.html), que carrega o app dentro de um iframe.
import { Platform } from 'react-native';

export type EmailDemo = {
  para: string;
  assunto: string;
  corpo: string;
  codigo: string;
  enviadoEm: string;
};

const ultimosCodigos: Record<string, string> = {};
const ouvintes = new Set<() => void>();

// O app está rodando dentro da vitrine do GitHub Pages?
export function estaNaVitrine() {
  return Platform.OS === 'web' && typeof window !== 'undefined' && !!window.parent && window.parent !== window;
}

export function gerarCodigo() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function enviarEmail(email: Omit<EmailDemo, 'enviadoEm'>) {
  const mensagem: EmailDemo = { ...email, enviadoEm: new Date().toISOString() };
  ultimosCodigos[email.para.toLowerCase()] = email.codigo;
  ouvintes.forEach((ouvinte) => ouvinte());

  if (estaNaVitrine()) {
    window.parent.postMessage({ tipo: 'facilita-email', email: mensagem }, window.location.origin);
  }
}

export function ultimoCodigoPara(endereco: string) {
  return ultimosCodigos[endereco.trim().toLowerCase()];
}

export function aoReceberEmail(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}
