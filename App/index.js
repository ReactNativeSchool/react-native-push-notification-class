import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
