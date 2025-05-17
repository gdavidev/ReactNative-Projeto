import { SafeAreaView, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import estilo from '../assets/css/style';
import { useState } from 'react';
import { auth } from '../firebase/config';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  async function handleAuth() {
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      setErro('');

      if (isRegistering) {
        // Criar novo usuário
        await createUserWithEmailAndPassword(auth, email, senha);
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        setIsRegistering(false);
      } else {
        // Login com usuário existente
        await signInWithEmailAndPassword(auth, email, senha);
        navigation.navigate('Menu');
      }
    } catch (error) {
      console.error(error);

      if (error.code === 'auth/invalid-email') {
        setErro('Email inválido');
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setErro('Email ou senha incorretos');
      } else if (error.code === 'auth/weak-password') {
        setErro('A senha deve ter pelo menos 6 caracteres');
      } else if (error.code === 'auth/email-already-in-use') {
        setErro('Este email já está em uso');
      } else {
        setErro('Ocorreu um erro. Tente novamente.');
      }
    }
  }

  function toggleMode() {
    setIsRegistering(!isRegistering);
    setErro('');
  }

  return (
    <SafeAreaView style={estilo.loginContainer}>
      <Image source={require('../assets/images/Pikachu_silhouette.jpg')} style={estilo.
        pikachuLogo} />
      <TextInput
        placeholder="Digite o seu e-mail"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        style={estilo.input}
      />
      <TextInput
        placeholder="Digite a sua senha"
        onChangeText={setSenha}
        value={senha}
        secureTextEntry
        style={estilo.input}
      />
      {erro && <Text style={estilo.erro}>{erro}</Text>}
      <TouchableOpacity style={estilo.button} onPress={handleAuth}>
        <Text style={estilo.buttonText}>{isRegistering ? 'Cadastrar' : 'Acessar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={estilo.linkButton} onPress={toggleMode}>
        <Text style={estilo.linkText}>
          {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Cadastre-se'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
