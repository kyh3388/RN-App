// 터미널에서 /frontend로 이동 후 npx expo start로 실행

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DetialPage from './components/DetailPage';
import ListPage from './components/ListPage';
import LoginPage from './components/LoginPage';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="ListPage" component={ListPage} />
        <Stack.Screen name="DetailPage" component={DetialPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;