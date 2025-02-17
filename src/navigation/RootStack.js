import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MainScreen from '../screens/MainScreen';
import CreateNotes from '../screens/CreateNotes';
import EditNote from '../screens/EditNote';
const Stack = createNativeStackNavigator()
const RootStack = () => {
  return (
   <Stack.Navigator>
    <Stack.Screen name='mainscreen' component={MainScreen} options={{headerShown:false}} />
    <Stack.Screen name='createnote' component={CreateNotes} options={{headerShown:false}} />
    <Stack.Screen name='edit' component={EditNote} options={{headerShown:false}} />
   </Stack.Navigator>
  )
}

export default RootStack