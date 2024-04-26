import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import Botao from '../../components/botao/botao';
import Checkbox from 'expo-checkbox';
import globalStyles from '../../styles/globalStyles.js'
import ReturnArrow from '../../components/returnArrow/returnArrow.jsx';
import LogoFacilita from '../../components/logoFacilita/logoFacilita.jsx';
import { Send } from '../../sendData.js';


function Cadastro({navigation}){
		const [checked, setChecked] = useState(false);
		const [matricula, setMatricula] = useState('');
		const [senha, setSenha] = useState('');
		const [cSenha, setCSenha] = useState('');
		const [email, setEmail] = useState('');

		let userData = {
			matricula: matricula,
			email: email,
			senha: senha
		};// Dados para serem enviados
		
		// Função para juntar o redirecionamento de página logo após meio segundo do Cadastro
		const handleSendLogin = () =>{
			Send(userData);
			setTimeout(() => {
				// OBS: Aqui crio uma arrow Function para o navigate não ser executado imediatamente
				navigation.navigate('Login');
			}, 500)
		}

		const verificarCamposPreenchidos = () => {
			return matricula != '' && senha != '' && cSenha != '' && email != '' && checked != false && senha == cSenha;
		};
		return(
			<View style={globalStyles.container}>
				<ReturnArrow navigation={navigation} />
				<View style={globalStyles.content}>
				
					<LogoFacilita />
					<View style={[globalStyles.inputBox, {height: '40%'}]}>
							<TextInput
									style={globalStyles.input}
									placeholder="Matrícula"
									placeholderTextColor="#f5f5f5"
									value={matricula}
									onChangeText={setMatricula}
							/>
							<TextInput
									style={globalStyles.input}
									placeholder="Senha"
									placeholderTextColor="#f5f5f5"
									value={senha}
									onChangeText={setSenha}
							/>
							<TextInput
									style={globalStyles.input}
									placeholder="Repita Sua Senha"
									placeholderTextColor="#f5f5f5"
									value={cSenha}
									onChangeText={setCSenha}
							/>
							<TextInput
									style={globalStyles.input}
									placeholder="E-mail"
									placeholderTextColor="#f5f5f5"
									value={email}
									onChangeText={setEmail}
							/>

						<View style={styles.viewCheck}>  
							<Checkbox
								style={[styles.checkBox, { borderColor: '#ffff' }]} // Define a cor da borda
								value={checked}
								onValueChange={() => setChecked(!checked)}
								tintColors={{ true: '#ffff', false: '#ffff' }} // Define a cor do ícone
							/>
								<Text style={{marginLeft: 5,marginTop: 10,color: '#ffff' }}>
									Aceito todos os termos e condições
								</Text>
						</View>  
			</View>
			<View style={globalStyles.caixaBtn}>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }} />
					<View style={globalStyles.caixaBtn}>
						<Botao 
							onPress={() => handleSendLogin()}
							disabled={!verificarCamposPreenchidos()}
						>
							Cadastrar
						</Botao>
					</View>
				</View>
			</View>
		</View>
		);
};

const styles = StyleSheet.create({
		checkBox:{
			color: '#ffff',
			marginTop: 10,
			width: 15,
			height: 15
		}, 
		viewCheck:{
			flexDirection: 'row'
		},
});

export default Cadastro
