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
import { ModalView } from '../../components/Modal';

type Props = {
  name: string;
  item: any;
}

export function Home(){
  const [text, setText] = useState(String);
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList] = useState([
    {id: '', name: '',}
  ]);
  const [listConcluded, setListConcluded] = useState([
    {id: '', name: ''},
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
    const listaConluida = await AsyncStorage.getItem("@LISTCONCLUDED");
    if (listaConluida !== null) {
      setListConcluded(JSON.parse(listaConluida));
    }
  }

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tarefas</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Ionicons name="ios-menu" size={32} color="white" />
        </TouchableOpacity>
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

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={addTask}
          >
            <AntDesign name="checkcircle" size={24} color="#0270FF" />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
      </View>

      <ModalView
        modalVisible={modalVisible}
      >
        <View>
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="ios-close" size={30} color="black" />
            </TouchableOpacity>
          </View>




        </View>
      </ModalView>
    </View>
  );
}
