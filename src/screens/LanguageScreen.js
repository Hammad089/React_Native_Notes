import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {hp, ms, vs, wp} from '../constants/scale';
import {fonts} from '../constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {Languages} from '../data/LanguageData';
import CheckIcon from '../assets/svgs/checkIcon.svg';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthRoutes } from '../constants/AuthRoutes';
import { useDispatch } from 'react-redux';
import { changelanguage } from '../store/actions/languageAction';
import Toast from 'react-native-toast-message';
import TranslationLanguage from '../store';
const LanguageScreen = () => {
  
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [coverIndex, setCoverIndex] = useState(null);
  const handleCoverIndex = index => {
    setCoverIndex(index === coverIndex ? null : index);
  };
  const handleNavigation = () => {
    if(coverIndex === null) {
     Alert.alert("No Language Select","Please Language Select")
    }
    else {
      navigation.navigate(AuthRoutes.onboarding)
      dispatch(changelanguage({
        SelectLanguageName:Languages[coverIndex].id,
        SelectLanguage:TranslationLanguage[Languages[coverIndex].id]
      }))
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{marginVertical: vs(15), marginHorizontal: ms(15)}}>
        <Text
          style={{
            fontFamily: fonts.Interblod,
            fontSize: RFValue(24),
            color: '#1C274C',
            fontWeight: 'bold',
          }}>
          Select Language
        </Text>
        <Text
          style={{
            marginTop: 5,
            fontFamily: fonts.Intermedium,
            fontSize: RFValue(12),
            color: '#C6C9D2',
          }}>
          Please Select your Language First
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Languages.map((item, index) => {
          const BackgroundColor = coverIndex === index ?  '#C6C9D2' : '#FFFFFF'; 
          return (
            <TouchableOpacity
              onPress={() => handleCoverIndex(index)}
              key={`${item.id}`}
              style={[styles.languageContainer,{backgroundColor:BackgroundColor}]}>
              <Image
                source={item.icon}
                resizeMode={'cover'}
                style={{height: 30, width: 30, marginLeft: wp(5)}}
              />
              <Text
                style={{
                  fontSize: RFValue(12),
                  fontFamily: fonts.Interregular,
                  color: '#000000',
                }}>
                {item.title}
              </Text>
              <View style={styles.CheckIcon}>
                <View style={styles.CheckIcon}>
                  {coverIndex === index && (
                    <CheckIcon width={wp(5)} height={hp(5)} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles.nextBtn} onPress={()=>handleNavigation()}>
          <Text style={styles.nexxtText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  languageContainer: {
    width: wp(90),
    height: hp(7),
    borderRadius: 8,
    borderColor: '#8D93A5',
    borderWidth: 1,
    columnGap: wp(5),
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  CheckIcon: {
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtn:{
    backgroundColor:'#1C274C',
    width:wp(90),
    height:hp(6.5),
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    borderRadius:30
  },
  nexxtText:{
    fontFamily:fonts.Intersemibold,
    fontSize:RFValue(18),
    fontWeight:'500',
    color:'#fff'
  }
});
