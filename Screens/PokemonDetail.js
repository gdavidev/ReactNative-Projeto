import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { addDocument, COLLECTIONS } from '../firebase/firestore';

const PokemonDetail = ({ route }) => {
  const { pokemon } = route.params; // Recebe o Pokémon da tela anterior
  const [details, setDetails] = useState(null);

  // Função para buscar detalhes do Pokémon
  const fetchPokemonDetails = async () => {
    const response = await fetch(pokemon.url); // Usa a URL do Pokémon para pegar detalhes
    const data = await response.json();
    setDetails(data); // Atualiza os detalhes
  };

  // Função para marcar/desmarcar como favorito
  const toggleFavorite = async () => {
    try {
      if (!details || !details.id) return;

      const newFavoriteStatus = !favorite;
      setFavorite(newFavoriteStatus);

      await addDocument(COLLECTIONS.FAVORITES, {
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
    fetchPokemonDetails();
  }, []);

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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeText: {
    backgroundColor: '#E50914',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  abilityText: {
    backgroundColor: '#333',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
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
