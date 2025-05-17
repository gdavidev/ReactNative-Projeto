import { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../assets/css/style';
import FlatListButton from '../components/FlatListButton';
import Loading from '../components/Loading';

const Pokedex = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemons = useCallback(() => {
    setLoading(true);

    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(res => res.json())
      .then(res => {
        setPokemons(res.results)
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [setPokemons]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={item => item.id || item.name}
          renderItem={({ item }) =>
            <FlatListButton
              text={item.name}
              onClick={() => navigation.navigate('PokemonDetail', { pokemon: item })} />
          } />
      )}
    </View>
  );
};

export default Pokedex;
