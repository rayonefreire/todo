import React, { ReactNode } from 'react';

import {
  ColorValue,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';

import { styles } from './styles';
import { theme } from '../../styles/theme';

type Props = {
  title: string;
  colorTitle?: ColorValue;
  action?: ReactNode;
  buttonNavigate?: boolean;
}

export function Header({
  title,
  colorTitle = useTheme().colors.text,
  action,
  buttonNavigate = false,
} : Props){
  const navigation = useNavigation();

  function handleNavigateHomeScreen() {
    navigation.navigate('Home');
  }

  return (
    <View style={[styles.container, { marginTop: buttonNavigate ? 8 : 30 }]}>
      {buttonNavigate &&
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.header}
          onPress={handleNavigateHomeScreen}
        >
          <MaterialCommunityIcons name="chevron-left" size={30} color={theme.blue}/>
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
      }
      
      <View style={styles.subHeader}>
        <Text style={[styles.title, { color: colorTitle }]}>
          { title }
        </Text>

        {action &&
          <View>
            { action }
          </View>
        }
      </View>
    </View>
  );
}