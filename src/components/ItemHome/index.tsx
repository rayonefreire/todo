import React from 'react';

import {
  TouchableOpacity,
  Text,
  ColorValue
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './styles';

type Props = {
  title: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: ColorValue;
  route: string;
}

export function ItemHome({ title, icon, color, route } : Props){
  const navigation = useNavigation();

  function handleNavigation() {
    navigation.navigate(route);
  }
  
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={handleNavigation}
    >
      <Text style={styles.title}>{ title }</Text>
      <MaterialCommunityIcons name={icon} size={28} color={color} style={{ marginLeft: 10, marginTop: 15 }} />
    </TouchableOpacity>
  );
}