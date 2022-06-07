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
  Alert,
} from 'react-native';

import { styles } from './styles';
import { ModalView } from '../../components/Modal';
import { Item } from '../../components/Item';
import { ItemModal } from '../../components/ItemModal';
import SETTINGS from '../../services/ItensSettings/settings.api';

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
    if (text === '') {
      Alert.alert("Ops!", "Por favor dígite sua tarefa.")
    } else if (text !== '') {
      list.push(item);
      AsyncStorage.setItem("@LIST", JSON.stringify(list));
      setText("");
    }
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
          renderItem={({ item }) => <Item getList={getList} item={item} list={list} listConcluded={listConcluded} name={item.name} />}
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
          <View style={styles.headerModal}>
            <Text style={styles.titleModal}>Opções</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="ios-close" size={30} color="#0270FF" />
            </TouchableOpacity>
          </View>
          <View style={styles.mainModal}>
            <FlatList
              data={SETTINGS}
              renderItem={({ item }) => <ItemModal title={item.title} modalVisible={modalVisible} setModalVisible={setModalVisible} />}
              keyExtractor={( item ) => item.id}
            />
          </View>
        </View>
      </ModalView>
    </View>
  );
}
