import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import ActiveCalenderIcon from '../assets/svgs/calender.svg';
import NonActiveCalenderIcon from '../assets/svgs/nonactivecalender.svg';
import NonActiveNotesIcon from '../assets/svgs/nonactivehome.svg';
import NonActiveSettingIcon from '../assets/svgs/nonactivesetting.svg';
import NonActiveTodo from '../assets/svgs/nonactivetodo.svg';
import ActiveNotesIcon from '../assets/svgs/notes.svg';
import ActiveSettingIcon from '../assets/svgs/setting.svg';
import ActiveTodoIcon from '../assets/svgs/todo.svg';
import Calender from '../bottomtabs/Calender';
import Notes from '../bottomtabs/Notes';
import Setting from '../bottomtabs/Setting';
import Todo from '../bottomtabs/Todo';
import { fonts } from '../constants/fonts';
import { useSelector } from 'react-redux';
const Tab = createBottomTabNavigator();
const MainScreen = () => {
  const {SelectLanguage} = useSelector(state => state.languageReducer);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.Intersemibold,
          fontSize: RFValue(10),
          color: '#1C274C',
          alignItems: 'center',
        },
        tabBarIcon: ({focused, color, size}) => {
          let IconName;
          let IconSize = size || 25;
          switch (route.name) {
            case 'Notes':
              IconName = focused ? (
                <ActiveNotesIcon width={IconSize} height={IconSize} />
              ) : (
                <NonActiveNotesIcon width={IconSize} height={IconSize} />
              );
              break;
            case 'Todo':
              IconName = focused ? (
                <ActiveTodoIcon width={IconSize} height={IconSize} />
              ) : (
                <NonActiveTodo width={IconSize} height={IconSize} />
              );
              break;
            case 'Calender':
              IconName = focused ? (
                <ActiveCalenderIcon width={IconSize} height={IconSize} />
              ) : (
                <NonActiveCalenderIcon width={IconSize} height={IconSize} />
              );
              break;
            case 'Setting':
              IconName = focused ? (
                <ActiveSettingIcon width={IconSize} height={IconSize} />
              ) : (
                <NonActiveSettingIcon width={IconSize} height={IconSize} />
              );
              break;
            default:
              IconName = null;
              break;
          }
          return IconName;
        },
      })}>
      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Todo" component={Todo} options={{headerShown: false}} />
      <Tab.Screen
        name="Calender"
        component={Calender}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
