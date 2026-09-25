import { adminUpdateUserAttributes } from '@/services/auth';

// Altera um atributo do usuário com permissão de administrador.
// Na versão original isso usava o AdminUpdateUserAttributesCommand do SDK da AWS direto
// no app, com uma chave de acesso escrita no código, que qualquer pessoa conseguiria
// extrair do aplicativo. O correto é essa chamada ficar em uma Lambda, com permissão
// dada por uma role do IAM, e o app só chamar essa Lambda.
function useChangeAttribute() {
    return async function changeAttribute(email: string, attribute: string, value: string) {
        try {
            await adminUpdateUserAttributes(email, [
                { Name: attribute, Value: value },
            ]);
            console.log('Atributos atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar atributos:', error);
        }
    }
}

export default useChangeAttribute;
