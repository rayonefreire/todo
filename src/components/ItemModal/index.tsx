import { useNavigation } from '@react-navigation/native';
import React from 'react';

import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { styles } from './styles';

type Props = {
  title: string;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ItemModal({ title, setModalVisible, modalVisible } : Props){
  const navigation = useNavigation();

  function handleTasksConcluded() {
    setModalVisible(!modalVisible);
    navigation.navigate('TaksConcluded');
  }

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleTasksConcluded}
      >
        <Text style={styles.title}>{ title }</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
    </View>
  );
}