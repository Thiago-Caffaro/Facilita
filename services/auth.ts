// Simulação local das funções de autenticação do Amplify (aws-amplify/auth).
// As funções têm os mesmos nomes, parâmetros e nomes de erro do Cognito, então os hooks
// originais do app continuam funcionando sem saber que o backend é uma demonstração.
import { alunos, usuarios, sessao, salvarEstado, type UsuarioDemo } from '@/services/demo/dados';
import { enviarEmail, gerarCodigo } from '@/services/demo/correio';
import { espera } from '@/services/demo/espera';

class AuthError extends Error {
  constructor(name: string, message = name) {
    super(message);
    this.name = name;
  }
}

function buscarUsuario(email: string) {
  return usuarios.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}

function usuarioLogado() {
  return sessao.email ? buscarUsuario(sessao.email) ?? null : null;
}

// Mesma política definida em backend/amplify/backend.ts
function validarSenha(senha: string) {
  if (senha.length < 6 || !/[A-Z]/.test(senha) || !/[0-9]/.test(senha)) {
    throw new AuthError('InvalidPasswordException');
  }
}

function exigirLogin() {
  const usuario = usuarioLogado();
  if (!usuario) throw new AuthError('UserUnAuthenticatedException');
  return usuario;
}

function primeiroNome(usuario: UsuarioDemo) {
  const aluno = alunos.find((a) => a.matricula === Number(usuario.atributos['custom:matricula']));
  return aluno ? aluno.nome.split(' ')[0] : 'aluno';
}

function enviarCodigoConfirmacao(usuario: UsuarioDemo) {
  usuario.codigoConfirmacao = gerarCodigo();
  enviarEmail({
    para: usuario.email,
    assunto: 'Confirme seu cadastro no Facilita',
    codigo: usuario.codigoConfirmacao,
    corpo: `Olá ${primeiroNome(usuario)},

Use o código abaixo no aplicativo para confirmar seu email e concluir o cadastro:

${usuario.codigoConfirmacao}

Se você não criou uma conta no Facilita, ignore este email.

Atenciosamente,
Equipe de Suporte Facilita.`,
  });
}

// Mesmo texto do email que a Lambda enviarEmail mandava (backend/lambdas/enviarEmail)
function enviarCodigoRecuperacao(usuario: UsuarioDemo) {
  usuario.codigoRecuperacao = gerarCodigo();
  enviarEmail({
    para: usuario.email,
    assunto: 'Recuperação de Senha',
    codigo: usuario.codigoRecuperacao,
    corpo: `Olá ${primeiroNome(usuario)},

Você solicitou a recuperação de sua senha. Para redefinir sua senha, copie o código abaixo no campo específico dentro do próprio aplicativo:

Código de recuperação de senha:

${usuario.codigoRecuperacao}

Se você não solicitou a recuperação de senha, por favor, ignore este e-mail.

Lembre-se, nunca compartilhe sua senha com ninguém, nem mesmo com nossa equipe de suporte. Mantenha suas informações seguras.

Atenciosamente,
Equipe de Suporte Facilita.`,
  });
}

export async function signIn({ username, password }: { username: string; password: string; options?: unknown }) {
  await espera();
  if (!username) throw new AuthError('EmptySignInUsername');
  if (!password) throw new AuthError('EmptySignInPassword');
  if (usuarioLogado()) throw new AuthError('UserAlreadyAuthenticatedException');

  const usuario = buscarUsuario(username);
  if (!usuario || usuario.senha !== password) throw new AuthError('NotAuthorizedException');
  if (!usuario.confirmado) throw new AuthError('UserNotConfirmedException');

  sessao.email = usuario.email;
  salvarEstado();
  return { isSignedIn: true, nextStep: { signInStep: 'DONE' } };
}

export async function signOut() {
  await espera(200);
  sessao.email = null;
  salvarEstado();
}

export async function signUp({
  username,
  password,
  options,
}: {
  username: string;
  password: string;
  options?: { userAttributes?: Record<string, string> };
}) {
  await espera();
  if (!/^\S+@\S+\.\S+$/.test(username.trim())) throw new AuthError('InvalidParameterException');
  if (buscarUsuario(username)) throw new AuthError('UsernameExistsException');
  validarSenha(password);

  // No sistema original essa checagem ficava na Lambda addUser; aqui ela acontece no cadastro
  const matricula = Number(options?.userAttributes?.['custom:matricula']);
  if (!alunos.some((a) => a.matricula === matricula)) throw new AuthError('MatriculaNotFoundException');

  const usuario: UsuarioDemo = {
    email: username.trim(),
    senha: password,
    sub: `demo-${Date.now()}`,
    confirmado: false,
    atributos: { ...options?.userAttributes },
  };
  usuarios.push(usuario);
  enviarCodigoConfirmacao(usuario);
  salvarEstado();
  return { isSignUpComplete: false, nextStep: { signUpStep: 'CONFIRM_SIGN_UP' } };
}

export async function confirmSignUp({ username, confirmationCode }: { username: string; confirmationCode: string }) {
  await espera();
  const usuario = buscarUsuario(username);
  if (!usuario) throw new AuthError('UserNotFoundException');
  if (!usuario.codigoConfirmacao || confirmationCode.trim() !== usuario.codigoConfirmacao) {
    throw new AuthError('CodeMismatchException');
  }
  usuario.confirmado = true;
  delete usuario.codigoConfirmacao;
  salvarEstado();
  return { isSignUpComplete: true, nextStep: { signUpStep: 'DONE' } };
}

export async function resendSignUpCode({ username }: { username: string }) {
  await espera(200);
  const usuario = buscarUsuario(username);
  if (!usuario) throw new AuthError('UserNotFoundException');
  enviarCodigoConfirmacao(usuario);
  salvarEstado();
  return { destination: username, deliveryMedium: 'EMAIL' };
}

export async function getCurrentUser() {
  await espera(100);
  const usuario = exigirLogin();
  return { username: usuario.email, userId: usuario.sub, signInDetails: { loginId: usuario.email } };
}

export async function fetchUserAttributes(): Promise<Record<string, string>> {
  await espera(100);
  const usuario = exigirLogin();
  return {
    email: usuario.email,
    email_verified: String(usuario.confirmado),
    sub: usuario.sub,
    ...usuario.atributos,
  };
}

export async function updateUserAttribute({
  userAttribute,
}: {
  user?: unknown;
  userAttribute: { attributeKey: string; value: string };
}) {
  await espera(200);
  exigirLogin().atributos[userAttribute.attributeKey] = userAttribute.value;
  salvarEstado();
}

// Equivalente ao AdminUpdateUserAttributes do Cognito. Na versão original isso era chamado
// direto do app com uma chave de acesso da AWS no código; o certo é rodar no servidor.
export async function adminUpdateUserAttributes(email: string, atributos: { Name: string; Value: string }[]) {
  await espera(200);
  const usuario = buscarUsuario(email);
  if (!usuario) throw new AuthError('UserNotFoundException');
  atributos.forEach(({ Name, Value }) => (usuario.atributos[Name] = Value));
  salvarEstado();
}

export async function resetPassword({ username }: { username: string }) {
  await espera();
  const usuario = buscarUsuario(username);
  if (!usuario) throw new AuthError('UserNotFoundException');
  enviarCodigoRecuperacao(usuario);
  salvarEstado();
  return {
    isPasswordReset: false,
    nextStep: {
      resetPasswordStep: 'CONFIRM_RESET_PASSWORD_WITH_CODE',
      codeDeliveryDetails: { destination: username, deliveryMedium: 'EMAIL' },
    },
  };
}

export async function confirmResetPassword({
  username,
  confirmationCode,
  newPassword,
}: {
  username: string;
  confirmationCode: string;
  newPassword: string;
}) {
  await espera();
  const usuario = buscarUsuario(username);
  if (!usuario) throw new AuthError('UserNotFoundException');
  if (!usuario.codigoRecuperacao || confirmationCode.trim() !== usuario.codigoRecuperacao) {
    throw new AuthError('CodeMismatchException');
  }
  validarSenha(newPassword);
  usuario.senha = newPassword;
  delete usuario.codigoRecuperacao;
  salvarEstado();
}

export async function updatePassword({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) {
  await espera();
  const usuario = exigirLogin();
  if (usuario.senha !== oldPassword) throw new AuthError('NotAuthorizedException');
  validarSenha(newPassword);
  usuario.senha = newPassword;
  salvarEstado();
}
