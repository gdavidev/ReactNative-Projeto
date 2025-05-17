import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FlatListButton({ text, onClick }) {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onClick}>
      <Text style={styles.itemName}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemName: {
    fontSize: 18,
    color: '#333',
  },
});