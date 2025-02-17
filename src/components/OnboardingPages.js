import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../constants/scale'; 
import {fonts} from '../constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { useOnboardingPages } from '../data/pages';

const OnboardingPages = ({item, index}) => {

  return (
    <View style={styles.container}>
       <item.image width={wp(80)} height={hp(40)} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
};

export default OnboardingPages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: wp(5),
    width: wp(100),
  },
  image: {
    width: wp(80),
    height: hp(40),
    marginBottom: hp(5),
  },
  textContainer: {
    marginTop:hp(14),
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.Intersemibold,
    fontSize: RFValue(24),
    color: '#363636',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  subtitle: {
    fontFamily: fonts.Interregular,
    fontSize: RFValue(12),
    color: '#363636',
    textAlign: 'center',
    paddingHorizontal: wp(10),
  },
});
