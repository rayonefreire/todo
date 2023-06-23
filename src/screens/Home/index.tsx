import React, { useContext, useState } from 'react';

import {
  FlatList,
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

import { styles } from './styles';
import { theme } from '../../styles/theme';

import { ItemHome } from '../../components/ItemHome';
import { Context } from '../../context';
import { ButtonIcon } from '../../components/ButtonIcon';
import { ModalView } from '../../components/ModalView';
import { ButtonText } from '../../components/ButtonText';

const ITENS = [
  {
    id: '1',
    name: 'Tarefas',
    icon_name: 'check',
    color: theme.blue,
    route: 'Tasks',
  },
  {
    id: '2',
    name: 'Agendados',
    icon_name: 'clock-time-eight-outline',
    color: theme.orange,
    route: 'TasksScheduled',
  },
  {
    id: '3',
    name: 'Importantes',
    icon_name: 'flag-outline',
    color: theme.purple,
    route: 'TasksImportant',
  },
];

export function Home(){
  const [showModal, setShowModal] = useState(false);
  const { user, setUser, setTheme } = useContext(Context);
  const scheme = useTheme();

  const SETTINGS = [
    {
      id: '1',
      name: 'Sair',
      on_press: () => {handleSignOut()},
    },
    {
      id: '2',
      name: 'Mudar tema',
      on_press: () => {handleChangeTheme()},
    },
  ];

  function handleShowModalSettings() {
    setShowModal(!showModal);
  }

  function handleSignOut() {
    AsyncStorage.clear();
    setUser(null);
  }

  function handleChangeTheme() {
    Alert.alert('Mudar tema', 'Escolha a opção de tema', [
      {
        text: 'Claro',
        onPress: async () => {
          setTheme('light');
          try {
            await AsyncStorage.setItem('@THEME', 'light');
          } catch (error) {
            console.log(error);
          }
        }
      },
      {
        text: 'Escuro',
        onPress: async () => {
          setTheme('dark');
          try {
            await AsyncStorage.setItem('@THEME', 'dark');
          } catch (error) {
            console.log(error);
          }
        }
      },
      {
        text: 'Sistema',
        onPress: async () => {
          setTheme(null);
          try {
            await AsyncStorage.setItem('@THEME', 'null');
          } catch (error) {
            console.log(error);
          }
        }
      }
    ])
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ButtonIcon
            icon_name='menu'
            color={scheme.colors.text}
            onPress={handleShowModalSettings}
          />

          <View style={styles.user}>
            <Image
              source={{ uri: user.image_user }}
              style={styles.image}
            />
            <Text style={[styles.name, { color: scheme.colors.text }]}>
              { user.name }
            </Text>
          </View>
        </View>

        <FlatList
          data={ITENS}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({ item }) => 
            <ItemHome
              title={item.name}
              icon={item.icon_name}
              color={item.color}
              route={item.route}
            />
          }
        />
      </View>

      <ModalView
        visible={showModal}
        handleCloseModal={handleShowModalSettings}
        height={200}
      >
        <ScrollView
          style={styles.modal}
        >
          {SETTINGS.map(item =>
            <View key={item.id} style={styles.item}>
              <ButtonText
                title={item.name}
                onPress={item.on_press}
              />
            </View>
          )}
        </ScrollView>
      </ModalView>
    </SafeAreaView>
  );
}