import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../assets/css/style';
import FlatListButton from '../components/FlatListButton'
import Loading from '../components/Loading'

export default function Generations({ navigation }) {
  const [generations, setGenerations] = useState([]);

  const fetchGenerations = useCallback(() => {
    const jsonData = require('../assets/data/generations.json')
    setGenerations(jsonData.geracoes)
  }, [setGenerations]);

  useEffect(() => {
    fetchGenerations();
  }, [fetchGenerations]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Treinadores (Gerações)</Text>

      {generations.length === 0 ? (
        <Loading />
      ) : (
        <FlatList
          data={generations}
          keyExtractor={gen => gen.geracao}
          renderItem={({ item }) =>
            <FlatListButton
              text={item.regiao}
              onClick={() => navigation.navigate('Trainers', { generation: item })} />
          } />
      )}
    </View>
  );
};


