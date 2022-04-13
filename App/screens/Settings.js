import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const DEFAULT_PREFERENCES = [
  {
    title: 'General Announcements',
    topicId: 'general-announcements',
    subscribed: true,
  },
  {
    title: 'Character Details',
    topicId: 'character-details',
    subscribed: true,
  },
];

export const Settings = () => {
  const [preferences, _setPreferences] = useState([]);

  const setPreference = newPreference => {
    const newPreferences = preferences.map(preference => {
      if (preference.topicId === newPreference.topicId) {
        return newPreference;
      }

      return preference;
    });

    _setPreferences(newPreferences);
  };

  // Load preferences
  useEffect(() => {
    AsyncStorage.getItem('DEMO_APP::PUSH_TOPICS').then(results => {
      if (results) {
        _setPreferences(JSON.parse(results));
      } else {
        _setPreferences(DEFAULT_PREFERENCES);
      }
    });
  }, []);

  useEffect(() => {
    // Sub/unsub
    preferences.forEach(preference => {
      if (preference.subscribed) {
        messaging().subscribeToTopic(preference.topicId);
      } else {
        messaging().unsubscribeFromTopic(preference.topicId);
      }
    });

    // Save to async
    AsyncStorage.setItem('DEMO_APP::PUSH_TOPICS', JSON.stringify(preferences));
  }, [preferences]);

  return (
    <ScrollView style={{backgroundColor: '#fff', paddingTop: 100}}>
      {preferences.map(preference => (
        <View
          key={preference.topicId}
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <Text>{preference.title}</Text>
          <Switch
            value={preference.subscribed}
            onValueChange={() =>
              setPreference({
                ...preference,
                subscribed: !preference.subscribed,
              })
            }
          />
        </View>
      ))}
    </ScrollView>
  );
};
