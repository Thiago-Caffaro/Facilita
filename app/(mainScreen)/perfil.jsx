import { Text, View, Image, Button } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/auth';

import perfilStyle from '@/styles/perfilStyle.js';
import requerirAlunoData from '@/hooks/requerirDados';
import getUserData from '@/hooks/setUserData';

import SetaSuperior from '@/components/setaSuperior/setaSuperior';
import { Ionicons } from '@expo/vector-icons';

import BarraSuperior from '@/components/barraSuperior/barraSuperior.jsx';
import loadingGif from '@/assets/loading.gif'
import barras from '@/assets/perfil/barras.png'
import useSignOut from '@/hooks/useSignOut';
import { MariaDbEngineVersion } from 'aws-cdk-lib/aws-rds';


function Perfil(){
    const [perfilData, setPerfilData] = useState(null);
    const signOut = useSignOut();
    useEffect(() => {
        const setData = async () => {
            const userData = await requerirAlunoData();
            const userDataOrganized = {
                Nome: userData.nomeAluno,
                Turma: userData.turmaAluno,
                Numero: userData.numeroAluno,
                Matricula: userData.matriculaAluno,
                Emails: [
                    userData.emailUsuario,
                    `${userData.nomeAluno.split(' ')[0].toLowerCase()}.${userData.matriculaAluno}@aluno.etejk.faetec.rj.gov.br`
                ]
            }
            setPerfilData(userDataOrganized);
        };
        setData();
    }, []);
    
    return(
        <View id='container' style={perfilStyle.container}>
            
            <BarraSuperior>Perfil</BarraSuperior>
            <SetaSuperior/>
            <View  id='content' style={perfilStyle.perfilArea}>
                {/* Se os dados carregarem, renderiza o perfil, se não, fica com gif de carregamento */}
                {perfilData ? (
                    <View style={perfilStyle.perfilData}>
                        {
                        Object.keys(perfilData).map((key)=> {
                            if( key == 'Nome' ){
                                return <View style={[perfilStyle.itemBox, perfilStyle.nomeBox]} key={key}>
                                    <Text style={perfilStyle.nome}>{perfilData[key]}</Text>
                                    <Text style={perfilStyle.perfilItem}>Matrícula: {perfilData['Matricula']}</Text>
                                </View>
                            }else if (key == 'Emails'){
                                return <View style={perfilStyle.itemBox} key={key}>
                                    <Text style={[perfilStyle.perfilItem, perfilStyle.itemTitle, {fontSize: 20}]}>{key}: </Text>
                                    <Text style={[perfilStyle.perfilItem]}>
                                        <Text style={perfilStyle.itemTitle}>Cadastrado:{'\n'}</Text>
                                        <Text>{perfilData[key][0]}</Text>
                                    </Text>
                                    <Text style={perfilStyle.perfilItem}>
                                        <Text style={perfilStyle.itemTitle}>Institucional:{'\n'}</Text>
                                        <Text>{perfilData[key][1]}</Text>
                                    </Text>
                                </View>
                            }
                            else if (key != "Matricula"){// Apenas os elementos mais simples como Turma e Curso são organizados em "Row"
                                return <View style={[perfilStyle.itemBox, {flexDirection: 'row'}]} key={key}>
                                    <Text style={[perfilStyle.perfilItem, perfilStyle.itemTitle]}>{key}: </Text>
                                    <Text style={perfilStyle.perfilItem}>{perfilData[key]}</Text>
                                </View>
                            }
                        })
                        }
                        <Button 
                            title='Sair da conta' 
                            onPress={() => signOut()} >
                        </Button>
                        <View id='barCodeBox' style={[perfilStyle.barCodeBox]}>
                            <Image style={perfilStyle.codeImage}  source={barras}></Image>
                        </View>
                    </View>
                ) : (
                    <View style={perfilStyle.loadingGifBox}>
                        <Image source={loadingGif} style={perfilStyle.loadingGif}/>
                        <Button title='Sair da conta' onPress={() => signOut()} >
                        
                        </Button>
                    </View>     
                )}
            </View>
        </View>
    );
    
};

export default Perfil;