import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ItemDetail({ route }) {
  const { item } = route.params; // Recebe o item da tela anterior
  const [details, setDetails] = useState(null);

  // Função para buscar detalhes do item
  const fetchItemDetails = useCallback(() => {
    fetch(item.url) // Usa a URL do item para pegar detalhes
      .then(res => res.json())
      .then(res => setDetails(res))
  }, [setDetails]);

  useEffect(() => {
    fetchItemDetails();
  }, [fetchItemDetails]);

  return details === null ? (
    <View style={styles.loadingContainer}>
      <Text>Carregando...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.name}>{details.name}</Text>
      <Text>Descrição:</Text>
      <Text>{details.effect_entries[0]?.short_effect || 'Sem descrição disponível'}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
