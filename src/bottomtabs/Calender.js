import React, {useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import RBSheet from 'react-native-raw-bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import AddNoteIcon from '../assets/svgs/add.svg';
import LeftArrow from '../assets/svgs/leftArrow.svg';
import RightArrow from '../assets/svgs/rightArrow.svg';
import {fonts} from '../constants/fonts';
import {hp, wp} from '../constants/scale';
import {SetAddTask} from '../store/actions/taskAction';
const CalendarScreen = () => {
  const {SelectLanguage} = useSelector(state => state.languageReducer);
  const {task} = useSelector(state => state.TaskReducer);
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const [titleTask, setTitleTask] = useState('');
  const [description, setDescription] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];
  const [selected, setSelected] = useState('');

  const HandleSaveTask = () => {
    if (titleTask && description.trim() === '') {
      Alert.alert('Please Enter Task for Remainder');
    } else {
      dispatch(SetAddTask({titleTask, description}));
      setTitleTask('');
      setDescription('');
      refRBSheet.current.close();
    }
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{marginHorizontal: wp(5), marginVertical: hp(2)}}>
          <Text
            style={{
              fontFamily: fonts.Intermedium,
              color: '#1C274C',
              fontSize: RFValue(16),
              fontWeight: '700',
            }}>
            {SelectLanguage.Calender}
          </Text>
        </View>
        <Calendar
          style={{
            borderColor: 'gray',
            height: 400,
          }}
          current={currentDate}
          onDayPress={day => {
            console.log('selected day', day);
            setSelected(day.dateString);
          }}
          markedDates={{
            [currentDate]: {
              selected: true,
              marked: true,
              selectedColor: '#1C274C',
            },
          }}
          theme={{
            backgroundColor: '#ffffff',
            dayTextColor: '#1C274C',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#1C274C',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#1C274C',
            textDisabledColor: '#1C274C',
            arrowColor: '#1C274C',
          }}
          renderArrow={direction => (
            <View>
              <Text style={{fontSize: 30}}>
                {direction === 'left' ? <LeftArrow /> : <RightArrow />}
              </Text>
            </View>
          )}
          renderHeader={date => {
            const formattedDate = new Date(date);
            const monthName = formattedDate.toLocaleString('default', {
              month: 'long',
            });
            const year = formattedDate.getFullYear();

            return (
              <View style={{padding: 10, alignItems: 'center'}}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: '#1C274C'}}>
                  {`${monthName} ${year}`}
                </Text>
              </View>
            );
          }}
        />
        {task.length > 0 && (
          <FlatList
            data={task}
            keyExtractor={(item, index) => item.id}
            ListHeaderComponent={() => (
              <View style={{marginHorizontal: wp(4)}}>
                <Text
                  style={{
                    fontFamily: fonts.Intersemibold,
                    fontSize: RFValue(14),
                    color: '#1C274C',
                    fontWeight: '700',
                  }}>
                  Remainder Task
                </Text>
              </View>
            )}
            renderItem={({item, index}) => {
              console.log('ITEM IN FLAT LIST', item);

              return (
                <View style={styles.taskContainer}>
                  <View style={{marginHorizontal: wp(5)}}>
                    <Text style={{color:'#8F9BB3'}}>{new Date(item.createdAt).toLocaleString()}</Text>
                    <Text
                      style={{
                        fontFamily: fonts.Interblack,
                        fontSize: RFValue(14),
                        color: '#000',
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.Interregular,
                        fontSize: RFValue(12),
                        color: '#8F9BB3',
                      }}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        )}
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
            <Text>New Task</Text>
          </View>
          <TextInput
            placeholder="Add a Task"
            placeholderTextColor={'#b4b4b4'}
            style={styles.todoInput}
            value={titleTask}
            onChangeText={text => setTitleTask(text)}
          />
          <TextInput
            placeholder="Description"
            placeholderTextColor={'#b4b4b4'}
            style={styles.todoInput}
            value={description}
            onChangeText={text => setDescription(text)}
          />
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => HandleSaveTask()}>
            <Text
              style={{
                color: '#fff',
                fontFamily: fonts.Interregular,
                fontSize: RFValue(12),
              }}>
              Add Task
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
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
  taskContainer: {
    backgroundColor: '#FFFFFF',
    width: wp(94),
    padding:10,
    alignSelf: 'center',
    marginVertical: hp(0.4),
    borderWidth: 0.5,
    borderColor: '#707070',
    borderRadius: 10,
  },
});
