import { Text, View, Image } from 'react-native';
import perfilStyle from './perfilStyle.js';
import globalStyles from '../../styles/globalStyles.js';
import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../context/auth.js';
import requerirAlunoData from '../../components/requerirDados/requerirDados.js';

import BarraSuperior from '../../components/barraSuperior/barraSuperior.jsx';

function Perfil(){
    const [perfilData, setPerfilData] = useState(null);
    const { matricula } = useContext(AuthContext);

    useEffect(() => {
        requerirAlunoData(matricula).then(data => {
            const senha = data.senhaUsuario // Fazer algo depois com isso
            const userData = {
                Nome: data.nomeAluno,
                Turma: data.turmaAluno,
                Numero: data.numeroAluno,
                Emails: [
                    data.emailUsuario,
                    `${data.primeiroNome}.${matricula}@aluno.etejk.faetec.rj.gov.br`
                ]
            }
            setPerfilData(userData);
        }).then(() =>{
            
        })
        
    }, [matricula]);

    
    return(
        <View id='container' style={perfilStyle.container}>
            <BarraSuperior>Perfil</BarraSuperior>
            <View  id='content' style={perfilStyle.perfilArea}>
                {/* Se os dados carregarem, renderiza o perfil, se não, fica com gif de carregamento */}
                {perfilData ? (
                    <View style={perfilStyle.perfilData}>
                        {
                        Object.keys(perfilData).map((key)=> {
                            if( key == 'Nome' ){
                                return <View style={[perfilStyle.itemBox, perfilStyle.nomeBox]} key={key}>
                                    <Text style={perfilStyle.nome}>{perfilData[key]}</Text>
                                    <Text style={perfilStyle.perfilItem}>Matrícula: {matricula}</Text>
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
                            else{// Apenas os elementos mais simples como Turma e Curso são organizados em "Row"
                                return <View style={[perfilStyle.itemBox, {flexDirection: 'row'}]} key={key}>
                                    <Text style={[perfilStyle.perfilItem, perfilStyle.itemTitle]}>{key}: </Text>
                                    <Text style={perfilStyle.perfilItem}>{perfilData[key]}</Text>
                                </View>
                            }
                        })
                        }
                        <View id='barCodeBox' style={[perfilStyle.barCodeBox]}>
                            <Image style={perfilStyle.codeImage}  source={require('./assets/barras.png')}></Image>
                        </View>
                    </View>
                ) : (
                    <View style={perfilStyle.loadingGifBox}>
                        <Image source={require('./assets/loading.gif')} style={perfilStyle.loadingGif}/>
                    </View>
                    
                )}
                </View>
                
                
            
        </View>
        
    );
    
};

export default Perfil;
