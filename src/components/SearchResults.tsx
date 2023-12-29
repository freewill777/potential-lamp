import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from 'expo-router';

const SearchResults = () => {
  const route = useRoute();
  const { query } = route.params;
  const [results, setResults] = useState([]);

  useEffect(() => {
    // TODO: Implement search logic to fetch posts, users, and events
    // that match the query and set them in the results state
  }, [query]);

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.name}</Text> // Replace with actual component to render each result
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
