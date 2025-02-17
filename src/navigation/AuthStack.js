import React from 'react'
import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LanguageScreen from '../screens/LanguageScreen'
import OnboardingScreen from '../screens/OnboardingScreen'
const Stack = createNativeStackNavigator()
const AuthStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='language' component={LanguageScreen} options={{headerShown:false}} />
        <Stack.Screen name='onboarding' component={OnboardingScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default AuthStack