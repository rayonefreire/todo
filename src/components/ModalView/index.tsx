import React, { ReactNode } from 'react';

import {
  Modal,
  ModalProps,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import { styles } from './styles';

type Props = ModalProps & {
  children: ReactNode;
  handleCloseModal: () => void;
  height?: number;
}

export function ModalView({ children, handleCloseModal, height = 320, ...rest } : Props){
  const scheme = useTheme();

  return (
    <Modal
      transparent
      animationType='slide'
      {...rest}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleCloseModal}
        style={styles.overlay}
      >

      </TouchableOpacity>

      <View style={[
        styles.container, {
          backgroundColor: scheme.colors.border,
          height: height,
        }
      ]}>
        { children }
      </View>
    </Modal>
  );
}