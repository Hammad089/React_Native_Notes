import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import OnboardingPages from '../components/OnboardingPages';
import {hp, wp} from '../constants/scale';
import {fonts} from '../constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {setHomeScreen} from '../store/actions/userAction';
import {useOnboardingPages} from '../data/pages';
const OnboardingScreen = () => {
  const pages = useOnboardingPages();
  const {SelectLanguage} = useSelector(state => state.languageReducer);
  const dispatch = useDispatch();
  const flatlistRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / wp(100));
    setActiveIndex(index);
  };
  const handleActiveIndex = useCallback(() => {
    if (activeIndex < pages.length - 1) {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      flatlistRef.current.scrollToIndex({index: nextIndex, animated: true});
    } else if (activeIndex >= pages.length - 1) {
      dispatch(setHomeScreen(true));
    } else {
      console.log('FUNCtion end');
    }
  }, [activeIndex]);

  console.log(activeIndex);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        ref={flatlistRef}
        data={pages}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        renderItem={({item, index}) => (
          <OnboardingPages item={item} index={index} />
        )}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        pagingEnabled
        scrollEventThrottle={16}
      />
      <View style={styles.pagination}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.continueBtn} onPress={handleActiveIndex}>
        <Text style={styles.continueText}>{SelectLanguage.conitnue}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(10),
  },
  dot: {
    width: wp(6),
    height: wp(2),
    borderRadius: wp(1.5),
    backgroundColor: '#C4C4C4',
    marginHorizontal: wp(1),
  },
  activeDot: {
    backgroundColor: '#1C274C',
    width: wp(6),
    height: wp(2),
  },
  continueBtn: {
    backgroundColor: '#1C274C',
    width: wp(90),
    height: hp(7),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: hp(3),
  },
  continueText: {
    fontFamily: fonts.Intersemibold,
    fontWeight: 'semibold',
    fontSize: RFValue(18),
    color: '#fff',
  },
});
