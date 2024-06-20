import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState, useContext } from 'react';

import Botao from '@/components/botao/botao.jsx';

import Checkbox from 'expo-checkbox';
import globalStyles from '@/styles/globalStyles.js'
import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';

import useCadastrar from '@/hooks/cadastrarUsuario';

import { AuthContext } from '@/context/auth'

function Cadastro(){
		const [checked, setChecked] = useState(false);
		const [cSenha, setCSenha] = useState('');
		const { 
			email,
			setEmail,
			senha,
			setSenha,
			matricula,
			setMatricula,
			hasAlert,
			alertType
		} = useContext(AuthContext);
		const cadastrar = useCadastrar();
		const verificarCamposPreenchidos = () => {
			return matricula != '' && senha != '' && cSenha != '' && email != '' && checked != false && senha == cSenha;
		};
		return(
			<View style={globalStyles.container}>
				<View id='errorDialog' style={{ zIndex: 10, position: 'absolute', bottom: 0, left: 0}}>
        			{hasAlert && alertType}
      			</View>
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
							onPress={() => cadastrar(matricula, email, senha)}
							disabled={!verificarCamposPreenchidos()}
						>
							Cadastrar
						</Botao>
						<View>
							<Botao 
							onPress={() => {
								setSenha("Senhateste1!");
								setCSenha("Senhateste1!");
								setMatricula("2210134300008");
							} }
						>
							Cadastrar DEV
						</Botao>
						</View>
						
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
