import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import RootStack from './RootStack';

const MainApp = () => {
    const {is_home_screen} = useSelector(state => state.userReducer);
    console.log(is_home_screen,"===========is home screen");
    
  return (
   <NavigationContainer>
    {is_home_screen ? <RootStack /> : <AuthStack />}
   </NavigationContainer>
  )
}

export default MainApp

