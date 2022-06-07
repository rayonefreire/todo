import React from 'react';

import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export function TasksConcluded(){
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="keyboard-arrow-left" size={40} color="#0270FF" />
        </TouchableOpacity>
        <Text style={styles.title}>Conclúidos</Text>
      </View>
    </View>
  );
}