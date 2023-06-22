import React from 'react';

import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ColorValue
} from 'react-native';

import { styles } from './styles';
import { useTheme } from '@react-navigation/native';

type Props = TouchableOpacityProps & {
  title: string;
  titleColor?: ColorValue;
}

export function ButtonText({ title, titleColor = 'black', ...rest } : Props){
  const scheme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={[
        styles.text, {
          color: titleColor === 'black' ? scheme.colors.text : titleColor
        }
      ]}>
        { title }
      </Text>
    </TouchableOpacity>
  );
}