import React, { useEffect, useState } from 'react';

import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  title: string;
}

export function TasksConcluded(){
  const [listConcluded, setListConcluded] = useState([
    {id: '', name: ''}
  ]);

  const navigation = useNavigation();

  async function getList() {
    const listaConluida = await AsyncStorage.getItem("@LISTCONCLUDED");
    if (listaConluida !== null) {
      setListConcluded(JSON.parse(listaConluida));
    }
  }

  useEffect(() => {
    getList();
  }, []);

  function Item({ title } : Props) {
    return (
      <>
        <View style={styles.item}>
          <AntDesign name="checkcircle" size={24} color="#0270FF" />
          <Text style={styles.titleItem}>{ title }</Text>
        </View>
        <View style={styles.divider} />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="keyboard-arrow-left" size={50} color="#0270FF" />
        </TouchableOpacity>
        <Text style={styles.title}>Conclúidos</Text>
      </View>

      <View style={styles.main}>
        <FlatList
          data={listConcluded}
          renderItem={({ item }) => <Item title={item.name} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}