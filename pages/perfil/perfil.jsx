import { Text, View } from 'react-native';
import mainWindowStyles from '../../styles/mainWindow.js'
import axios from 'axios';
import { useEffect, useState } from 'react';

function Perfil({navigation}){
    const [dataObj, setDataObj] = useState(null);
    const matriculaTeste = 2310130051033;

    const vinculo = async () => {
        try {
            const response = await axios.get('https://api.caffaro.cloud/getAluno', {
                params: {
                    matricula: matriculaTeste,
                },
            });
            // Verifique a resposta do servidor e realize a validação do login.
            if (response.data.success) {
                // Vínculo bem-sucedido
                console.log('Aluno encontrado');
                
                return {
                    nomeAluno: response.data.nomeAluno,
                    turmaAluno: response.data.turmaAluno,
                    numeroAluno: response.data.numeroAluno,
                    matriculaAluno: matriculaTeste
                }
            } else {
              // Vínculo falhou
              console.error('Erro de autenticação:', response.data.message);
            }
          } catch (error) {
            console.error('Erro ao fazer o vínculo:', error);
          }
    }
    

    useEffect(() => {
        vinculo(matriculaTeste).then(data => {
            setDataObj(data);
        });
        
    }, [matriculaTeste]);

    return(
        <View id='container' style={mainWindowStyles.container}>
            <View id='content' style={mainWindowStyles.info}>
                {dataObj ? (
                    <>
                        <Text>{dataObj.nomeAluno}</Text>
                        <Text>{dataObj.turmaAluno}</Text>
                        <Text>{dataObj.numeroAluno}</Text>
                        <Text>{dataObj.matriculaAluno}</Text>
                    </>
                ) : (
                    <Text>Carregando...</Text>
                )}
            </View>
        </View>
        
    );
};

export default Perfil;
