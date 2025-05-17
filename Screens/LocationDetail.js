import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../assets/css/style';
import Loading from '../components/Loading';

const LocationDetail = ({ route }) => {
  const { location } = route.params;
  const [detail, setDetail] = useState(null);

  const fetchLocationDetail = useCallback(async () => {
    const response = await fetch(location.url);
    const data = await response.json();
    setDetail(data);
  }, [location.url]);

  useEffect(() => {
    fetchLocationDetail();
  }, [fetchLocationDetail]);

  return !detail ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>{detail.name}</Text>
      <Text style={styles.subtitle}>Region:</Text>
      <Text style={styles.text}>{detail.region?.name || 'Sem região definida'}</Text>
      <Text style={styles.subtitle}>Entrada:</Text>
      <FlatList
        data={detail.area}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <Text style={styles.text}>{item.name}</Text>
        )}
      />
    </View>
  );
};

export default LocationDetail;
