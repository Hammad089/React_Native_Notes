import {StyleSheet, Text, TouchableOpacity, View,Linking,Share} from 'react-native';
import React from 'react';
import {fonts} from '../constants/fonts';
import {hp, wp} from '../constants/scale';
import {RFValue} from 'react-native-responsive-fontsize';
import PrivacyIcon from '../assets/svgs/privacy.svg';
import RateusIcon from '../assets/svgs/rateus.svg';
import ShareIcon from '../assets/svgs/share.svg'
import { useSelector } from 'react-redux';
const Setting = () => {
  const {SelectLanguage} = useSelector(state => state.languageReducer);
  const privacyPolicy =async() => {
    await Linking.openURL('https://sites.google.com/view/hamitechnologies?usp=sharing').catch(err => {});
  }
  const ShareAppLink = async () => {
    try {
      const result = await Share.share({
        title: 'AR Drawing Link',
        message:
          'Please install this app and stay safe. \n\nDownload here: https://play.google.com/store/apps/details?id=com.tasknexus',
      });
  
      if (result.action === Share.sharedAction) {
        console.log('App link shared successfully:', result);
      } else if (result.action === Share.dismissedAction) {
        console.log('User dismissed the share dialog');
      }
    } catch (error) {
      console.error('Error sharing app link:', error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{marginHorizontal: wp(5), marginVertical: hp(2)}}>
        <Text
          style={{
            fontFamily: fonts.Intersemibold,
            fontSize: RFValue(15),
            fontWeight: '700',
            color: '#1C274C',
          }}>
          {SelectLanguage.Setting}
        </Text>
      </View>
      <TouchableOpacity style={styles.privacyPolicyCard} onPress={()=>privacyPolicy()}>
        <View style={{flexDirection:'row',columnGap:wp(8),alignItems:'center',marginLeft:wp(5),marginTop:5}}>
        <PrivacyIcon width={wp(5)} height={hp(5)} />
        <Text style={{color:'#1C274C',fontFamily:fonts.Intermedium,fontSize:RFValue(13),fontWeight:'400'}}>{SelectLanguage.privacy_policy}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareAppCard} onPress={()=>ShareAppLink()}>
        <View style={{flexDirection:'row',columnGap:wp(8),alignItems:'center',marginLeft:wp(5),marginTop:5}}>
        <ShareIcon width={wp(5)} height={hp(5)} />
        <Text style={{color:'#1C274C',fontFamily:fonts.Intermedium,fontSize:RFValue(13),fontWeight:'400'}}>{SelectLanguage.Share_App}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  privacyPolicyCard: {
    margin:wp(2),
    width: wp(90),
    height: hp(6.5),
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
  },
  rateUsCard:{
    margin:wp(2),
    width: wp(90),
    height: hp(6.5),
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
  },
  shareAppCard:{
    margin:wp(2),
    width: wp(90),
    height: hp(6.5),
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
  }
});
