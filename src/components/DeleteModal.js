import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {wp} from '../constants/scale';
import {fonts} from '../constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';
const DeleteModal = ({ isVisible, setIsVisible, DeleteTask, deleteId }) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{backgroundColor: '#FFFFFF', padding: 40, borderRadius: 10}}>
          <Text>Are you sure you want to delete the task</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              columnGap: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => {
                DeleteTask(deleteId);
                setIsVisible(false);
              }}
             >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setIsVisible(false)}>
              <Text style={styles.cancelText}> Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  deleteBtn: {
    backgroundColor: 'red',
    width: wp(30),
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cancelBtn: {
    backgroundColor: '#eeee',
    width: wp(30),
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  deleteText: {
    fontFamily: fonts.Intermedium,
    color: '#fff',
    fontSize: RFValue(12),
  },
  cancelText: {
    fontFamily: fonts.Intermedium,
    color: '#000',
    fontSize: RFValue(12),
  },
});
