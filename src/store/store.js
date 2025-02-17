import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {userReducer} from './reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import { NoteReducer } from './reducers/NoteReducer';
import { TodoReducer } from './reducers/TodoReducer';
import { languageReducer } from './reducers/languageReducer';
import { TaskReducer } from './reducers/taskreducer';
const rootConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['is_home_screen'],
};
const rootNote = {
    key:'notes',
    storage:AsyncStorage,
    whitelist:['notes']
  }
  const todoConfig = {
    key:'todo',
    storage:AsyncStorage,
    whitelist:['todo']
  }
  const taskConfig =  {
    key:'task',
    storage:AsyncStorage,
    whitelist:['task']
  }

const rootReducer = combineReducers({
    userReducer:persistReducer(rootConfig,userReducer),
    NoteReducer:persistReducer(rootNote,NoteReducer),
    TodoReducer:persistReducer(todoConfig,TodoReducer),
    TaskReducer:persistReducer(taskConfig,TaskReducer),
    languageReducer:languageReducer
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck:false,
    })
});
export const persistor = persistStore(store);
