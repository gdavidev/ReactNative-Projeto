import{SafeAreaView, Image} from 'react-native';

import estilo from '../assets/css/style';

export default function Splash({navigation}) {

  async function prepare() {
    try {
      //await aguarde a promise tempo função
      await new Promise(tempo => setTimeout(tempo, 2500));
    } catch (e) {
      Alert.alert(e);
    } finally {
      navigation.navigate('Login');
    }
  }

  prepare();

  return (
    <SafeAreaView style={estilo.container}>
      <Image source={require('../assets/images/Poke-Stop.gif')} style={estilo.
       backgroundImage}/>
    </SafeAreaView>
  );
}