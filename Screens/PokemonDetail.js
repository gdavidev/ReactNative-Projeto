import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { upsertFavorite, getFavoriteByName } from '../firebase/firestore';
import Loading from '../components/Loading';

const PokemonDetail = ({ route }) => {
  const { pokemon } = route.params; // Recebe o Pokémon da tela anterior
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  // Função para marcar/desmarcar como favorito
  const toggleFavorite = async () => {
    try {
      if (!details) 
        return;

      const newFavoriteStatus = !favorite;
      setFavorite(newFavoriteStatus);

      await upsertFavorite({
        ...details,
        favorite: newFavoriteStatus
      });

      Alert.alert(
        'Success',
        newFavoriteStatus
          ? `${details.name} added to favorites!`
          : `${details.name} removed from favorites!`
      );
    } catch (error) {
      console.error('Error updating favorite status:', error);
      setFavorite(!favorite); // Reverter estado em caso de erro
      Alert.alert('Error', 'Failed to update favorite status');
    }
  };

  useEffect(() => {
    setLoading(true)

    getFavoriteByName(pokemon.name)
      .then(res => {
        if (res === null) {
          // Usa a URL do Pokémon para pegar detalhes
          fetch(pokemon.url)
            .then(res => res.json())
            .then(res => {
              setDetails(res)
              setFavorite(false)
              setLoading(false)
            })
        } else {
          setDetails(res)
          setFavorite(res.favorite)
          setLoading(false)
        }
      });
  }, [setDetails, pokemon.name, pokemon.url]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Image source={{ uri: details.sprites.front_default }} style={styles.image} />

          <TouchableOpacity
            style={[styles.favoriteButton, favorite ? styles.favoriteActive : {}]}
            onPress={toggleFavorite}
          >
            <Text style={styles.favoriteButtonText}>
              {favorite ? '★ Favorito' : '☆ Adicionar aos Favoritos'}
            </Text>
          </TouchableOpacity>

          <Text>Tipos:</Text>
          {details.types.map((type, index) => (
            <Text key={index}>{type.type.name}</Text>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  favoriteButton: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 15,
  },
  favoriteActive: {
    backgroundColor: '#E50914',
  },
  favoriteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default PokemonDetail;
