import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchPosts, fetchUsers, fetchEvents } from '../lib/api';

const SearchResults = ({ searchTerm }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchPosts();
      const users = await fetchUsers();
      const events = await fetchEvents();
      const combinedData = [...posts, ...users, ...events];
      const filteredResults = combinedData.filter((item) => item.name.includes(searchTerm));
      setResults(filteredResults);
    };

    fetchData();
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
