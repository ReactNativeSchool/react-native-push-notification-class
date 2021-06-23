import React, { useEffect } from 'react';
import { NavigationContainer, Link } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import messaging from '@react-native-firebase/messaging';
import { Alert, Linking } from 'react-native';

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

const openLink = (link) => {
  Linking.canOpenURL(link).then((supported) => {
    if (supported) {
      Linking.openURL(link);
    } else {
      Alert.alert('Sorry, something went wrong.');
    }
  });
};

const Tab = createBottomTabNavigator();
export default () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage = {}) => {
      const notification = remoteMessage.notification || {};
      const title = notification.title;
      const body = notification.body;
      const actions = [];

      if (remoteMessage.data && remoteMessage.data.deeplink) {
        actions.push({
          text: 'Learn more >',
          onPress: () => {
            openLink(remoteMessage.data.deeplink);
          },
        });
      }

      if (title) {
        Alert.alert(title, body, actions);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const onNotificationOpen = async (remoteMessage = {}) => {
      if (remoteMessage.data && remoteMessage.data.deeplink) {
        openLink(remoteMessage.data.deeplink);
      }
    };

    messaging().getInitialNotification(onNotificationOpen);
    const unsubscribe = messaging().onNotificationOpenedApp(onNotificationOpen);

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
