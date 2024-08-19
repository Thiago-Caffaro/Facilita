import { CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand } from '@aws-sdk/client-cognito-identity-provider';
import useInfoBox from '@/hooks/alertDialog/infoBox';
function useChangeAttribute() {
  const client = new CognitoIdentityProviderClient({
     region: 'us-east-1',
     credentials: {
      accessKeyId: '',
      secretAccessKey: '',
    },
  });
// Função para atualizar atributos
    return function changeAttribute(email: string, attribute: string, value: string) {
        const updateUserAttributeAdmin = async (username: string, attributes: Array<any>) => {
            try {
            const command = new AdminUpdateUserAttributesCommand({
                UserPoolId: 'us-east-1_eoV39YcqI',
                Username: username,
                UserAttributes: attributes,
            });
            await client.send(command);
            console.log('Atributos atualizados com sucesso!');
            } catch (error) {
            console.error('Erro ao atualizar atributos:', error);
            }
        };
        try {
            updateUserAttributeAdmin(email, [
            { Name: attribute, Value: value },
            ]);
        } catch(error:any){
            console.log(error);
        }
    }
}



export default useChangeAttribute;