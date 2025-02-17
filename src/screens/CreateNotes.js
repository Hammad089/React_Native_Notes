import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackArrowIcon from '../assets/svgs/backarrow.svg';
import {hp, wp} from '../constants/scale';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addNote} from '../store/actions/noteAction';
const CreateNotes = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const HandleSaveNotes = () => {
    if (title === '' || subtitle === null || subtitle === '') {
      Alert.alert('Please Enter Notes');
    } else {
      dispatch(addNote({title, subtitle}));
      setTitle('');
      setSubtitle('');
      navigation.goBack()
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: moderateScale(10),
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrowIcon width={wp(6)} height={hp(6)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => HandleSaveNotes()}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder={'Title'}
        placeholderTextColor={'#4B4B4B'}
        style={styles.titleTextInput}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        placeholder="Notes here"
        placeholderTextColor={'#4B4B4B'}
        style={styles.notesInput}
        multiline={true}
        numberOfLines={10000}
        value={subtitle}
        onChangeText={text => setSubtitle(text)}
      />
    </View>
  );
};

export default CreateNotes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  saveBtn: {
    backgroundColor: '#1C274C',
    width: wp(24),
    height: hp(4),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontFamily: fonts.Intermedium,
    fontSize: RFValue(12),
  },
  titleTextInput: {
    borderBottomWidth: 0.5,
    borderColor: '#E6E6E6',
    paddingLeft: wp(4),
    color: '#4B4B4B',
    fontFamily: fonts.Interblod,
    fontSize: RFValue(18),
    fontWeight: '500',
  },
  notesInput: {
    paddingLeft: wp(4),
    paddingVertical: hp(3),
    color: '#4B4B4B',
    fontFamily: fonts.Interblod,
    fontSize: RFValue(12),
   
    width: wp(100),
    height: 200,
    textAlignVertical: 'top',
  },
});
