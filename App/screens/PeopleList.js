import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Alert, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const PeopleList = ({ navigation }) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://swapi.dev/api/people')
      .then((res) => res.json())
      .then((res) => {
        setPeople(res.results);
      })
      .catch((error) => {
        Alert.alert('an error occurred! See console for more info.');
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <FlatList
      style={{ backgroundColor: '#fff' }}
      data={people}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.push('PersonDetails', {
              details: item,
            })
          }
        >
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 15,
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.10)',
            height: 1,
            marginLeft: 10,
          }}
        />
      )}
      keyExtractor={(item) => item.url}
      ListFooterComponent={() => {
        if (loading) {
          return (
            <View>
              <ActivityIndicator size="large" />
            </View>
          );
        }

        return null;
      }}
    />
  );
};
