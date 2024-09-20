import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState, useContext } from 'react';

import Botao from '@/components/botao/botao.jsx';

import Checkbox from 'expo-checkbox';
import globalStyles from '@/styles/globalStyles.js'
import LogoFacilita from '@/components/logoFacilita/logoFacilita.jsx';
import SetaSuperior from '@/components/setaSuperior/setaSuperior';

import useCadastrar from '@/hooks/cadastrarUsuario';

import { AuthContext } from '@/context/auth'

function Cadastro(){
	const hiddenIcon = require('@/assets/icons/olhoSemVer.png');
	const visibleIcon = require('@/assets/icons/olhoVendo.png');
	const [checked, setChecked] = useState(false);
	const [isHidden, setIsHidden] = useState(true);
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
			<SetaSuperior />
			<View id='errorDialog' style={{ zIndex: 10, position: 'absolute', bottom: 0, left: 0}}>
				{hasAlert && alertType}
			</View>
			<View style={globalStyles.content}>
				<LogoFacilita tamanho={0} />
				<View style={[globalStyles.inputBox, {height: '40%'}]}>
						<TextInput
								style={globalStyles.input}
								placeholder="Matrícula"
								placeholderTextColor="#f5f5f5"
								value={matricula}
								onChangeText={setMatricula}
						/>
						<View style={globalStyles.inputBoxPass}>
							<TextInput
								style={globalStyles.input}
								placeholder="Senha"
								placeholderTextColor="#f5f5f5"
								value={senha}
								onChangeText={setSenha}
								secureTextEntry={true ? isHidden : false}
							/>
							<TouchableOpacity style={globalStyles.eyeStyle} onPress={() => setIsHidden(!isHidden)}>
								<Image style={globalStyles.eyeImageStyle} 
								source={hiddenIcon ? isHidden ? hiddenIcon : visibleIcon : hiddenIcon}></Image>
							</TouchableOpacity>
						</View>
						
						<View style={globalStyles.inputBoxPass}>
							<TextInput
									style={globalStyles.input}
									placeholder="Repita Sua Senha"
									placeholderTextColor="#f5f5f5"
									value={cSenha}
									onChangeText={setCSenha}
									secureTextEntry={true ? isHidden : false}
							/>
						</View>
						<TextInput
								style={globalStyles.input}
								placeholder="E-mail"
								placeholderTextColor="#f5f5f5"
								value={email}
								onChangeText={setEmail}
						/>

					<View style={localStyles.viewCheck}>  
						<Checkbox
							style={[localStyles.checkBox, { borderColor: '#ffff' }]} // Define a cor da borda
							value={checked}
							onValueChange={() => setChecked(!checked)}
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
						onPress={() => matricula !== undefined && cadastrar(matricula, email, senha)} // Checa se a matricula existe e chama a função de cadastro
						disabled={!verificarCamposPreenchidos()}
					>
						Cadastrar
					</Botao>
					<View>

					</View>
					
				</View>
			</View>
		</View>
	</View>
	);
};

const localStyles = StyleSheet.create({
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
