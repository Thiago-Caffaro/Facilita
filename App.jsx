import {StyleSheet, View} from 'react-native';
import Login from './pages/login/login';

export default function App() {
  return (
    <View style={styles.container}>
        <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#429D1E',
    alignItems: 'center',
    justifyContent: 'center',
  }
});