import { Auth } from 'aws-amplify';

export default function useSignIn(){

  const { setUser } = useContext(AuthContext);
  async function signIn(matricula, password) {
    try {
      var user = await Auth.signIn(matricula, password)
      await setUser(user);
      return user
    } catch (error) {
      console.error('Erro no login:', error);
      console.log(user, matricula, password, Auth);
    }
  }
  return signIn;

}