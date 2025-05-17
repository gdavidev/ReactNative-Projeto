import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import styles from '../assets/css/style';
import Loading from '../components/Loading'

export default function Trainers({ route }) {
  const { generation } = route.params; // Recebe a geração da tela anterior
  const [trainers, setTrainers] = useState([]);

  // Função para buscar detalhes da geração
  const fetchGenerationTrainers = useCallback(() => {
    const jsonData = require('../assets/data/trainers.json')
    const generationData = jsonData.geracoes.find(gen => gen.geracao === generation.geracao)

    setTrainers(generationData.lideres_ginasio)
  }, [generation, setTrainers]);

  useEffect(() => {
    fetchGenerationTrainers();
  }, [fetchGenerationTrainers]);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{generation.geracao}ª Geração: {generation.regiao}</Text>
      <Text>Treinadores:</Text>

      <ScrollView style={localStyles.trainerContainer}>
        {trainers.lenght === 0 ? (
          <Loading />
        ) : (
          trainers.map((trainer, i) => (
            <View key={i} style={localStyles.trainerContainer}>
              <Text style={localStyles.trainerName}>
                {trainer.nome}
              </Text>
              <View style={localStyles.trainerInfoContainer}>
                <Text style={localStyles.trainerInfoText}>{trainer.cidade}</Text>
                <Text style={localStyles.trainerInfoText}>{trainer.tipo}</Text>
              </View>

              {trainer.pokemons.map((pokemon, j) => (
                <View key={j} style={localStyles.pokemonContainer}>
                  <Text>{pokemon.nome}</Text>
                  <Text>{pokemon.nivel}</Text>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  trainerContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    borderBottomColor: '#AAA',
    borderBottomWidth: 1,
  },
  trainerName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  trainerInfoText: {
    fontSize: 10,
    color: '#222'
  },
  trainerInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  pokemonContainer: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})