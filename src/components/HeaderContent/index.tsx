import React from 'react';

import {
  View,
  Text
} from 'react-native';

import { styles } from './styles';

type Props = {
  title: string;
  subtitle?: string;
}

export function HeaderContent({ title, subtitle } : Props){
  return (
    <View>
      <Text style={styles.title}>
        { title }
      </Text>
      <Text style={styles.subtitle}>
        { subtitle }
      </Text>
    </View>
  );
}