import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {hp, vs, wp} from '../constants/scale';
import {fonts} from '../constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import SearchIcon from '../assets/svgs/search.svg';
import AddNoteIcon from '../assets/svgs/add.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, toggleTodoCompletion} from '../store/actions/todoAction';
import CircleIcon from '../assets/svgs/circle.svg';
import ActiveCircle from '../assets/svgs/activecircle.svg';
import RightArrowIcon from '../assets/svgs/right.svg';

const Todo = () => {
   const {SelectLanguage} = useSelector(state => state.languageReducer);
  const refRBSheet = useRef();
  const [TodoSearch, setTodoSearch] = useState('');
  const [TodoItem, setTodoItem] = useState('');
  const [filteredTodo, setFilteredTodo] = useState([]);
  const [animationHeight] = useState(new Animated.Value(0));
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const {todo} = useSelector(state => state.TodoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (TodoSearch.trim() === '') {
      setFilteredTodo(todo);
    } else {
      const filteredTodo = todo.filter(todos =>
        todos.TodoItem.toLowerCase().includes(TodoSearch.toLowerCase()),
      );
      setFilteredTodo(filteredTodo);
    }
  }, [TodoSearch, todo]);

  const HandleSaveTodo = () => {
    if (TodoItem.trim() === '') {
      Alert.alert('Please enter a valid To-do item');
    } else {
      dispatch(addTodo({TodoItem: TodoItem}));
      setTodoItem('');
      refRBSheet.current.close();
    }
  };

  const handleTaskToggle = taskId => {
    dispatch(toggleTodoCompletion(taskId));
  };

  const handleArrowClick = () => {
    setShowCompletedTasks(!showCompletedTasks);
    Animated.timing(animationHeight, {
      toValue: showCompletedTasks ? 0 : hp(10),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const completedTodos = todo.filter(item => item.completed);
  const activeTodos = todo.filter(item => !item.completed);

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{marginVertical: hp(3), marginHorizontal: wp(4)}}>
          <Text
            style={{
              color: '#242424',
              fontFamily: fonts.Intermedium,
              fontSize: RFValue(16),
              fontWeight: '700',
            }}>
            {SelectLanguage.Todo}
          </Text>
        </View>
        <View style={styles.searchSection}>
          <SearchIcon
            style={styles.searchIcon}
            width={20}
            height={20}
            color="#000"
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#000"
            value={TodoSearch}
            onChangeText={text => setTodoSearch(text)}
            underlineColorAndroid="transparent"
          />
        </View>
        {filteredTodo.length > 0 ? (
          <FlatList
            data={filteredTodo}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={styles.todoContainer}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    margin: wp(4),
                    columnGap: wp(4),
                    alignItems: 'center',
                  }}
                  onPress={() => handleTaskToggle(item.id)}>
                  {item.completed ? <ActiveCircle /> : <CircleIcon />}
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontWeight: '400',
                      textDecorationLine: item.completed
                        ? 'line-through'
                        : 'none',
                      textDecorationColor: item.completed ? '#000' : '',
                    }}>
                    {item.TodoItem}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: '#1C274C',
                fontFamily: fonts.Intermedium,
                fontSize: RFValue(14),
                fontWeight: '500',
              }}>
              {SelectLanguage.no_todo_found}
            </Text>
          </View>
        )}
        {completedTodos.length > 0 && (
          <>
            <TouchableOpacity
              onPress={handleArrowClick}
              style={styles.completedHeader}>
              <Text style={styles.completedText}>Completed Todo</Text>
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: animationHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                }}>
                <RightArrowIcon />
              </Animated.View>
            </TouchableOpacity>

            <Animated.View style={styles.completedContainer}>
              {showCompletedTasks && (
                <FlatList
                  data={completedTodos}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <View style={styles.completedTodoItem}>
                      {item.completed ? <ActiveCircle /> : <CircleIcon />}
                      <Text style={styles.completedTodoText}>
                        {item.TodoItem}
                      </Text>
                    </View>
                  )}
                />
              )}
            </Animated.View>
          </>
        )}

        {todo === null ? (
          <View
            style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{marginTop: -hp(4)}}>
              <Text style={styles.noNotesText}>No Todo</Text>
              <Text style={styles.noNotesSubText}>
                You haven't created any todo yet!
              </Text>
            </View>
          </View>
        ) : null}

        <View style={{position: 'absolute', right: 10, bottom: 0}}>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <AddNoteIcon width={wp(25)} height={hp(25)} />
          </TouchableOpacity>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            backgroundColor: '#F4F4F4',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: hp(30),
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View>
          <View style={{flexDirection: 'row', columnGap: wp(4), margin: wp(4)}}>
            <TouchableOpacity onPress={() => refRBSheet.current.close()}>
              <AntDesign name="close" size={25} />
            </TouchableOpacity>
            <Text>New To-do</Text>
          </View>
          <TextInput
            placeholder="Add a To-do item"
            placeholderTextColor={'#b4b4b4'}
            style={styles.todoInput}
            value={TodoItem}
            onChangeText={text => setTodoItem(text)}
          />
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => HandleSaveTodo()}>
            <Text
              style={{
                color: '#fff',
                fontFamily: fonts.Interregular,
                fontSize: RFValue(12),
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </>
  );
};

export default Todo;

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    backgroundColor: '#F9F9F9',
    borderRadius: 30,
    height: 50,
    paddingHorizontal: wp(5),
  },
  searchIcon: {
    position: 'absolute',
    left: wp(4),
  },
  input: {
    width: '100%',
    paddingLeft: wp(7),
    fontSize: RFValue(14),
    color: '#000',
  },
  noNotesText: {
    color: '#1C274C',
    fontFamily: fonts.Intersemibold,
    fontWeight: '700',
    fontSize: RFValue(13),
    textAlign: 'center',
    paddingBottom: 5,
  },
  noNotesSubText: {
    color: '#BBBBBB',
    fontFamily: fonts.Interregular,
    fontSize: RFValue(10),
  },
  todoInput: {
    backgroundColor: '#FFFFFF',
    padding: wp(4),
    margin: wp(2),
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  saveBtn: {
    backgroundColor: '#1C274C',
    width: wp(20),
    height: hp(3.5),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-end',
    marginRight: wp(3),
  },
  todoContainer: {
    marginVertical: hp(2),
    backgroundColor: '#8D93A5',
    width: wp(90),
    height: hp(7),
    borderRadius: 10,
    alignSelf: 'center',
  },
  completedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: wp(5),
  },
  completedText: {
    fontSize: RFValue(14),
    fontWeight: '700',
    color: '#242424',
    textAlign: 'center',
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedTodoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8D93A5',
    width: wp(90),
    padding: wp(5),
    borderRadius: 10,
    marginBottom: hp(1),
  },
  completedTodoText: {
    fontSize: RFValue(12),
    fontWeight: '400',
    textDecorationLine: 'line-through',
    textDecorationColor: '#000',
    marginLeft: wp(2),
  },
});
