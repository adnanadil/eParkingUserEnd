// Models are popups that are displayed on the app. we use this to show that a booking is complete 
// and once the booking is complete we then we to the main page using the navigation props sent to the 
// parkingCheckout component from the eachParking screen basically passing the props to the children

import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

export const ModalView = ({showModel, navigation}) => {
  const [modalVisible, setModalVisible] = useState(showModel);

// When ok is pressed we go back to the screen to see all the parking lots
const modalButtonPressed = () => {
    setModalVisible(!modalVisible)
    navigation.navigate("Parkings")
} 

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Booking Confirmed</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={modalButtonPressed}>
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // width: 200,
    // height: 200,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

