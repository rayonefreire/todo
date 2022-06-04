import React from 'react';

import {
  View,
  Modal
} from 'react-native';

import { styles } from './styles';

type Props = {
  modalVisible: boolean;
  children: any;
}

export function ModalView({ modalVisible, children } : Props){
  return (
    <Modal
      transparent
      animationType='slide'
      visible={modalVisible}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          { children }
        </View>
      </View>
    </Modal>
  );
}