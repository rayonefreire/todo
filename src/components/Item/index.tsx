import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { styles } from './styles';

type Props = {
  name: string;
  item: any;
  list: any;
  listConcluded: any;
  getList(): Promise<void>;
}

export function Item({ name, item, list, listConcluded, getList } : Props){
  return (
    <View style={styles.item}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          const isMe = (element) => element.name === item.name;
          const pos = list.findIndex(isMe);
          list.splice(pos, 1);
          listConcluded.push(item);
          console.log(listConcluded);
          AsyncStorage.setItem("@LISTCONCLUDED", JSON.stringify(listConcluded));
          AsyncStorage.setItem('@LIST', JSON.stringify(list));
          getList();
        }}
      >
        <View style={styles.check} />
      </TouchableOpacity>
      <Text style={styles.titleItem}>{ name }</Text>
    </View>
);
}