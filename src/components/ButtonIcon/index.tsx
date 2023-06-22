import React from 'react';

import {
  ColorValue,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
  icon_name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color?: ColorValue;
  size?: number;
}

export function ButtonIcon({ icon_name, color = 'black', size = 28, ...rest } : Props){
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...rest}
    >
      <MaterialCommunityIcons name={icon_name} size={size} color={color} />
    </TouchableOpacity>
  );
}