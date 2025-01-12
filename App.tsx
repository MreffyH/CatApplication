import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage';
import GLBPage from './GLBPage';
import GLBBPage from './GLBBPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

export type RootStackParamList = {
  Home: undefined;
  GLBPage: undefined;
  GLBBPage: undefined;
  LoginPage: undefined;
  RegisterPage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="GLBPage" component={GLBPage} />
        <Stack.Screen name="GLBBPage" component={GLBBPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;