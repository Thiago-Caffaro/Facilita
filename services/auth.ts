// Simulação local das funções de autenticação do Amplify (aws-amplify/auth).
// As funções têm os mesmos nomes, parâmetros e nomes de erro do Cognito, então os hooks
// originais do app continuam funcionando sem saber que o backend é uma demonstração.
import { alunos, usuarios, CODIGO_DEMO, type UsuarioDemo } from '@/services/demo/dados';
import { espera } from '@/services/demo/espera';

let usuarioLogado: UsuarioDemo | null = null;

class AuthError extends Error {
  constructor(name: string, message = name) {
    super(message);
    this.name = name;
  }
}

function buscarUsuario(email: string) {
  return usuarios.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}

// Mesma política definida em backend/amplify/backend.ts
function validarSenha(senha: string) {
  if (senha.length < 6 || !/[A-Z]/.test(senha) || !/[0-9]/.test(senha)) {
    throw new AuthError('InvalidPasswordException');
  }
}

function exigirLogin() {
  if (!usuarioLogado) throw new AuthError('UserUnAuthenticatedException');
  return usuarioLogado;
}

export async function signIn({ username, password }: { username: string; password: string; options?: unknown }) {
  await espera();
  if (!username) throw new AuthError('EmptySignInUsername');
  if (!password) throw new AuthError('EmptySignInPassword');
  if (usuarioLogado) throw new AuthError('UserAlreadyAuthenticatedException');

  const usuario = buscarUsuario(username);
  if (!usuario || usuario.senha !== password) throw new AuthError('NotAuthorizedException');
  if (!usuario.confirmado) throw new AuthError('UserNotConfirmedException');

  usuarioLogado = usuario;
  return { isSignedIn: true, nextStep: { signInStep: 'DONE' } };
}

export async function signOut() {
  await espera(200);
  usuarioLogado = null;
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

  usuarios.push({
    email: username.trim(),
    senha: password,
    sub: `demo-${Date.now()}`,
    confirmado: false,
    atributos: { ...options?.userAttributes },
  });
  return { isSignUpComplete: false, nextStep: { signUpStep: 'CONFIRM_SIGN_UP' } };
}

export async function confirmSignUp({ username, confirmationCode }: { username: string; confirmationCode: string }) {
  await espera();
  const usuario = buscarUsuario(username);
  if (!usuario) throw new AuthError('UserNotFoundException');
  if (confirmationCode.trim() !== CODIGO_DEMO) throw new AuthError('CodeMismatchException');
  usuario.confirmado = true;
  return { isSignUpComplete: true, nextStep: { signUpStep: 'DONE' } };
}

export async function resendSignUpCode({ username }: { username: string }) {
  await espera(200);
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
}

// Equivalente ao AdminUpdateUserAttributes do Cognito. Na versão original isso era chamado
// direto do app com uma chave de acesso da AWS no código; o certo é rodar no servidor.
export async function adminUpdateUserAttributes(email: string, atributos: { Name: string; Value: string }[]) {
  await espera(200);
  const usuario = buscarUsuario(email);
  if (!usuario) throw new AuthError('UserNotFoundException');
  atributos.forEach(({ Name, Value }) => (usuario.atributos[Name] = Value));
}

export async function resetPassword({ username }: { username: string }) {
  await espera();
  if (!buscarUsuario(username)) throw new AuthError('UserNotFoundException');
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
  if (confirmationCode.trim() !== CODIGO_DEMO) throw new AuthError('CodeMismatchException');
  validarSenha(newPassword);
  usuario.senha = newPassword;
}

export async function updatePassword({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) {
  await espera();
  const usuario = exigirLogin();
  if (usuario.senha !== oldPassword) throw new AuthError('NotAuthorizedException');
  validarSenha(newPassword);
  usuario.senha = newPassword;
}
