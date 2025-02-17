import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Menu} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import AddNoteIcon from '../assets/svgs/add.svg';
import NotesIcon from '../assets/svgs/NotesIcon.svg';
import PlusIcon from '../assets/svgs/plusIcon.svg';
import SearchIcon from '../assets/svgs/search.svg';
import {AuthRoutes} from '../constants/AuthRoutes';
import {fonts} from '../constants/fonts';
import {hp, vs, wp} from '../constants/scale';
import {DeleteNote} from '../store/actions/noteAction';
import DeleteModal from '../components/DeleteModal';

const Notes = () => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const {SelectLanguage} = useSelector(state => state.languageReducer);
  const navigation = useNavigation();
  const [searchItem, setSearchItem] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const {notes} = useSelector(state => state.NoteReducer);
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);

  useEffect(() => {
    if (searchItem.trim() === '') {
      setFilteredNotes(notes);
    } else {
      const filteredNotes = notes.filter(
        note =>
          note.title.toLowerCase().includes(searchItem.toLowerCase()) ||
          note.subtitle.toLowerCase().includes(searchItem.toLowerCase()),
      );
      setFilteredNotes(filteredNotes);
    }
  }, [searchItem, notes]);

  const openMenu = index => setVisibleMenuIndex(index);
  const closeMenu = () => setVisibleMenuIndex(null);

  const deleteItem = id => {
    dispatch(DeleteNote(id));
    closeMenu();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{marginHorizontal: wp(5), marginVertical: vs(10)}}>
        <Text
          style={{
            color: '#242424',
            fontFamily: fonts.Interblod,
            fontSize: RFValue(16),
            fontWeight: 'bold',
          }}>
          {SelectLanguage.TaskNexus}
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
          value={searchItem}
          onChangeText={text => setSearchItem(text)}
          underlineColorAndroid="transparent"
        />
      </View>

      {filteredNotes.length === 0 && searchItem.trim() !== '' ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No notes found</Text>
        </View>
      ) : filteredNotes.length > 0 ? (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => (
            <View style={styles.cardContainer}>
              <View style={styles.notesCard}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: wp(2),
                  }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Menu
                    style={{width: wp(25)}}
                    visible={visibleMenuIndex === index}
                    onDismiss={closeMenu}
                    anchor={
                      <Entypo
                        name="dots-three-vertical"
                        size={20}
                        onPress={() => openMenu(index)}
                      />
                    }>
                    <Menu.Item
                      onPress={() => {
                        navigation.navigate(AuthRoutes.edit, {
                          id: item.id,
                          title: item.title,
                          subtitle: item.subtitle,
                        });
                        closeMenu();
                      }}
                      title="Edit"
                    />
                    <Menu.Item
                      onPress={() => {
                        setDeleteId(item.id);
                        setIsVisible(true);
                      }}
                      title="Delete"
                    />
                  </Menu>
                </View>

                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <View
          style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
          <NotesIcon width={wp(30)} height={hp(30)} />
          <View style={{marginTop: -hp(4)}}>
            <Text style={styles.noNotesText}>{SelectLanguage.no_notes}</Text>
            <Text style={styles.noNotesSubText}>
              {SelectLanguage.you_havent_create_any_note_yet}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.createNoteBtn}
            onPress={() => navigation.navigate(AuthRoutes.createnote)}>
            <PlusIcon width={wp(5)} height={hp(5)} />
            <Text style={styles.createText}>{SelectLanguage.create_note}</Text>
          </TouchableOpacity>
        </View>
      )}

      {notes.length > 0 && (
        <View style={{position: 'absolute', right: 10, bottom: 0}}>
          <TouchableOpacity
            onPress={() => navigation.navigate(AuthRoutes.createnote)}>
            <AddNoteIcon width={wp(25)} height={hp(25)} />
          </TouchableOpacity>
        </View>
      )}
      <DeleteModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        DeleteTask={deleteItem}
        deleteId={deleteId}
      />
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginTop: hp(2),
    margin: wp(1),
  },
  notesCard: {
    backgroundColor: 'rgba(141,147,165,0.3)',
    borderRadius: 15,
    width: wp(45),
    height: hp(30),
    padding: wp(3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cardTitle: {
    color: '#1C274C',
    fontFamily: fonts.Intermedium,
    fontSize: RFValue(16),
    fontWeight: '700',
  },
  cardSubtitle: {
    color: '#1C274C',
    fontFamily: fonts.Intermedium,
    fontSize: RFValue(12),
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
  createNoteBtn: {
    backgroundColor: '#1C274C',
    padding: wp(3),
    width: wp(50),
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  createText: {
    color: '#fff',
    marginLeft: wp(2),
    fontFamily: fonts.Interbold,
    fontSize: RFValue(14),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: wp(2),
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginTop: vs(10),
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
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontFamily: fonts.Interbold,
    fontSize: RFValue(16),
    color: '#1C274C',
  },
});
