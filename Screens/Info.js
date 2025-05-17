import React from 'react';
import { SafeAreaView, Text} from 'react-native';
import estilo from '../assets/css/style';

export default function Menu({ navigation }) {
  return (
    <SafeAreaView style={estilo.menuContainer}>
      <Text style={estilo.titulo}>Feito por: Denis e Gabriel David</Text> 
      <Text style={estilo.titulo}>API: pokeapi.co</Text> 
    </SafeAreaView>
  );
}
