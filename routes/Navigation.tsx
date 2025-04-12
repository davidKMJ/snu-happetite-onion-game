import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Splash } from './Splash';
import { Onboarding } from './Onboarding';
import { Main } from './Main';
import { ChatLog } from './ChatLog';

const Stack = createStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName='Onboarding'
    >
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='Onboarding' component={Onboarding} />
      <Stack.Screen name='Main' component={Main} />
      <Stack.Screen name='ChatLog' component={ChatLog} />

    </Stack.Navigator>
  )
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  )
}

export default Navigation;