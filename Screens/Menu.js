import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import estilo from '../assets/css/style';

export default function Menu({ navigation }) {
  // Definição dos botões com cores e textos personalizados
  const botoes = [
    { id: 1, texto: 'Pokedex', cor: '#FF0000' },
    { id: 2, texto: 'Favoritos', rota: 'Favorites', cor: '#E50914' },
    { id: 3, texto: 'Itens', cor: '#FFD700' },
    { id: 4, texto: 'Treinadores', rota: 'Generations', cor: '#007FFF' },
    { id: 5, texto: 'Locais', cor: '#228B22' },
    { id: 6, texto: 'Login', cor: '#000000' },
    { id: 7, texto: 'Splash', cor: '#ffffff' }
  ];

  return (
    <SafeAreaView style={estilo.menuContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Info')}>
        <Text style={estilo.titulo}>DegaDex</Text>
      </TouchableOpacity>

      <SafeAreaView style={estilo.botoesContainer}>
        <View style={estilo.grid}>
          {botoes.map((botao) => (
            <TouchableOpacity
              key={botao.id}
              style={[estilo.botao, { borderColor: botao.cor }]}
              onPress={() => navigation.navigate(botao.rota ?? botao.texto)}
            >
              <Text style={[estilo.textoBotao, { color: botao.cor }]}>{botao.texto}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>

    </SafeAreaView>
  );
}
