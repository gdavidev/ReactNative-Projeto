import { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from '../assets/css/style';
import FlatListButton from '../components/FlatListButton';
import Loading from '../components/Loading';
import { queryDocuments, COLLECTIONS } from '../firebase/firestore';

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorite pokemons from Firestore
  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);

      // Query pokemons where favorite is true
      const favoritePokemons = await queryDocuments(
        COLLECTIONS.FAVORITES,
        [{ field: 'favorite', operator: '==', value: true }]
      );

      setFavorites(favoritePokemons);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      Alert.alert('Error', 'Failed to load favorite Pokémon');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon Favoritos</Text>

      {loading ? (
        <Loading />
      ) : favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Você ainda não tem Pokémons favoritos.
          </Text>
          <Text style={styles.emptySubText}>
            Visite a Pokédex e marque alguns como favoritos!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <FlatListButton
              text={item.name}
              onClick={() => navigation.navigate('PokemonDetail', { pokemon: item })} />
          } />
      )}
    </View>
  );
};

export default Favorites;
