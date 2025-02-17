import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import BackArrowIcon from '../assets/svgs/backarrow.svg';
  import {hp, wp} from '../constants/scale';
  import {moderateScale} from 'react-native-size-matters';
  import {fonts} from '../constants/fonts';
  import {RFValue} from 'react-native-responsive-fontsize';
  import {useNavigation} from '@react-navigation/native';
  import {useDispatch} from 'react-redux';
  import {addNote, UpdatedNote} from '../store/actions/noteAction';
  const EditNote = ({route}) => {
    const {id,title,subtitle} = route.params
    console.log(id,title,subtitle,"=============================id title sub title");
    
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [updateTitle, setUpdateTitle] = useState(title || '');
    const [updateSubTitle, setSubUpdateTitle] = useState(subtitle || '');
    
    useEffect(() => {
        setUpdateTitle(title);
        setSubUpdateTitle(subtitle)
    },[title,subtitle])

    const HandleUpdateNote = () => {
        if (updateTitle === '' || updateSubTitle === '') {
            Alert.alert('Please Enter Notes');
        } else {
            dispatch(UpdatedNote(id, { title: updateTitle, subtitle: updateSubTitle }));
            setUpdateTitle('');
            setSubUpdateTitle('');
            navigation.goBack();
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
            onPress={() => HandleUpdateNote()}>
            <Text style={styles.saveText}>Update</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder={'Edit Title'}
          placeholderTextColor={'#4B4B4B'}
          style={styles.titleTextInput}
          value={updateTitle}
          onChangeText={setUpdateTitle}
        />
        <TextInput
          placeholder="Notes here"
          placeholderTextColor={'#4B4B4B'}
          style={styles.notesInput}
          multiline={true}
          numberOfLines={10000}
          value={updateSubTitle}
          onChangeText={setSubUpdateTitle}
        />
      </View>
    );
  };
  
  export default EditNote;
  
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
      fontSize: RFValue(16),
      fontWeight: '700',
    },
    notesInput: {
      paddingLeft: wp(4),
      paddingVertical: hp(3),
      color: '#4B4B4B',
      fontFamily: fonts.Interblod,
      fontSize: RFValue(10),
      width: wp(100),
      height: 200,
      textAlignVertical: 'top',
    },
  });
  