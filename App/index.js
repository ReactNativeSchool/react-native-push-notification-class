import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

import { PeopleList } from './screens/PeopleList';
import { PersonDetails } from './screens/PersonDetails';
import { Intro } from './screens/Intro';

const PeopleStack = createStackNavigator();
const People = () => (
  <PeopleStack.Navigator>
    <PeopleStack.Screen name="People" component={PeopleList} />
    <PeopleStack.Screen
      name="PersonDetails"
      component={PersonDetails}
      options={() => ({
        title: '',
      })}
    />
  </PeopleStack.Navigator>
);

const ProfileStack = createStackNavigator();
const IntroScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Intro" component={Intro} />
  </ProfileStack.Navigator>
);

const Tab = createBottomTabNavigator();
export default () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage = {}) => {
      const notification = remoteMessage.notification || {};
      const title = notification.title;
      const body = notification.body;
      if (title) {
        Alert.alert(title, body);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer
      linking={{
        prefixes: ['swapidemo://', 'https://reactnativeschool.com'],
        config: {
          PeopleTab: {
            initialRouteName: 'People',
            screens: {
              People: {
                path: 'people',
              },
              PersonDetails: {
                path: 'person/:id',
              },
            },
          },
        },
      }}
    >
      <Tab.Navigator>
        <Tab.Screen
          name="IntroTab"
          component={IntroScreen}
          options={{ title: 'Intro' }}
        />
        <Tab.Screen
          name="PeopleTab"
          component={People}
          options={{ title: 'People' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
