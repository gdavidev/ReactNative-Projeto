import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute', // Faz a imagem cobrir toda a tela
    width: '100%', // Largura total
    height: '100%', // Altura total
    resizeMode: 'cover', // Ajusta a imagem para cobrir toda a tela
  },
  pikachuLogo: {
    position: 'absolute', // Faz a imagem flutuar
    top: -40, // Aproximadamente 5 cm do topo
    width: 200, // Tamanho fixo da imagem (ajuste como necessário)
    height: 200,
    resizeMode: 'contain', // Mantém proporções da imagem
    zIndex: -1 // Coloca o elemento atrás dos outros
  },
  container: {
    flex: 1,
    backgroundColor: '#a10101',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  erro: {
    color: '#E50914',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    backgroundColor: '#E50914', // Vermelho Pokébola
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    color: '#fff'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 15,
    padding: 10,
  },
  linkText: {
    color: '#E50914',
    fontSize: 14,
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  botoesContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  botao: {
    width: '48%', // Mantém a largura para dois botões por linha
    height: 100, // Ajuste de altura
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 5,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: '#E50914',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 15,
    alignSelf: 'center',
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  }
});

export default styles;
