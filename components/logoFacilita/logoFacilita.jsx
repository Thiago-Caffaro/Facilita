import { Image } from 'react-native';
function LogoFacilita({tamanho}){
    return(
        <Image id='facilitaLogo' 
              style={tamanho > 0 ? 
               {
                height: tamanho,
                maxWidth: tamanho * 3,
               }
              :{              
                height: 100,
                maxWidth: 300,
               }
            }
              source={require('./assets/logoAppWhite.png')} />
    );
}

export default LogoFacilita;