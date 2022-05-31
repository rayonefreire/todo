import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { styles } from './styles';

type Props = {
  name: string;
  item: any;
}

export function Home(){
  const [text, setText] = useState(String);
  const [list, setList] = useState([
    {id: '', name: '', done: false}
  ]);

  function addTask() {
    const item = {
      id: list.length.toString(),
      name: text,
      done: false
    }
    list.push(item);
    AsyncStorage.setItem("@LIST", JSON.stringify(list));
    setText("");
  }

  async function getList() {
    const lista = await AsyncStorage.getItem("@LIST");
    if (lista !== null) {
      setList(JSON.parse(lista));
    }
  }

  //AsyncStorage.clear();

  useEffect(() => {
    getList();
  }, []);

  function Item({ name, item } : Props) {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            const isMe = (element) => element.name === item.name;
            const pos = list.findIndex(isMe);
            console.log(pos);
            list.splice(pos, 1);
            console.log(list);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tarefas</Text>
      </View>

      <View style={styles.main}>
        <FlatList
          data={list}
          extraData={list}
          renderItem={({ item }) => <Item name={item.name} item={item} />}
          keyExtractor={( item ) => item.id}
        />

        <View style={styles.form}>
          <Ionicons name="ios-add-circle-sharp" size={32} color="gray" />

          <TextInput
            placeholderTextColor='white'
            onChangeText={setText}
            style={styles.input}
            keyboardAppearance='dark'
          />

          {
            !text ? 
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={addTask}
              >
                <AntDesign name="checkcircle" size={24} color="#0270FF" />
              </TouchableOpacity>
            </View> :
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={addTask}
              >
                <AntDesign name="checkcircle" size={24} color="#0270FF" />
              </TouchableOpacity>
            </View>
          }
        </View>

        <View style={styles.divider} />
      </View>
    </View>
  );
}