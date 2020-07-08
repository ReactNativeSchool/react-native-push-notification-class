import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Alert } from 'react-native';

const valueMap = {
  name: 'Name',
  height: 'Height',
  mass: 'Mass',
  hair_color: 'Hair Color',
  skin_color: 'Skin Color',
  eye_color: 'Eye Color',
  birth_year: 'Birth Year',
  gender: 'Gender',
};

export const PersonDetails = ({ route }) => {
  const params = route.params || {};
  const { details = {}, id } = params;
  const [displayDetails, setDisplayDetails] = useState({});

  const emptyDetails = Object.keys(details).length === 0;

  useEffect(() => {
    if (!emptyDetails) {
      setDisplayDetails(details);
    }
  }, []);

  useEffect(() => {
    if (emptyDetails && id) {
      fetch(`https://swapi.dev/api/people/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setDisplayDetails(res);
        })
        .catch((error) => {
          Alert.alert('an error occurred! See console for more info.');
          console.log(error);
        })
        .finally(() => {
          // setLoading(false);
        });
    }
  }, [id]);

  return (
    <ScrollView
      style={{ backgroundColor: '#fff' }}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      {Object.keys(valueMap).map((key) => {
        if (!displayDetails[key]) {
          return null;
        }

        return (
          <Text style={{ fontSize: 18, marginTop: 10 }} key={key}>
            <Text style={{ fontWeight: 'bold' }}>{`${valueMap[key]}: `}</Text>
            {displayDetails[key]}
          </Text>
        );
      })}
    </ScrollView>
  );
};
