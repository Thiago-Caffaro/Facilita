import { resendSignUpCode } from '@aws-amplify/auth';
export default async function resendConfirmationCode(username: string) {
    try {
        const result = await resendSignUpCode({
            username: username, // Email ou outro identificador de usuário
        });
        console.log("Código de confirmação reenviado com sucesso:", result);
    } catch (error) {
        console.error("Erro ao reenviar código de confirmação:", error);
    }
}