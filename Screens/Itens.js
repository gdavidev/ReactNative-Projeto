import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../assets/css/style';
import FlatListButton from '../components/FlatListButton'
import Loading from '../components/Loading'

export default function Itens({ navigation }) {
  const [items, setItems] = useState([]);

  const fetchItems = useCallback(() => {
    fetch('https://pokeapi.co/api/v2/item?limit=20')
      .then(res => res.json())
      .then(res => setItems(res.results))
      .catch(err => console.error(err));
  }, [setItems]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itens</Text>

      {items.length === 0 ? (
        <Loading />
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.name}
          renderItem={({ item }) =>
            <FlatListButton
              text={item.name}
              onClick={() => navigation.navigate('ItemDetail', { item: item })} />
          } />
      )}
    </View>
  );
};
