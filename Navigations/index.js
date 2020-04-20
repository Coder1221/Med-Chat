import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Auth from '../Screens/PhoneAuth'
const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Phone_Auth" component={Auth} />
        </Stack.Navigator>
    </NavigationContainer>
  );    
}

function MainStackNavigator(){
    return(
        MyStack()
    )
}  
export default MainStackNavigator;