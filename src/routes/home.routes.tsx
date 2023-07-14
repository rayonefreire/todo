import { useContext, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  useColorScheme,
  Image,
} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, useTheme } from "@react-navigation/native";
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Tasks } from "../screens/Tasks";
import { Home } from "../screens/Home";
import { TasksChecked } from "../screens/TasksChecked";
import { TasksScheduled } from "../screens/TasksScheduled";
import { TasksImportant } from "../screens/TasksImportant";
import { ButtonIcon } from "../components/ButtonIcon";
import { Context } from "../context";
import { ModalView } from '../components/ModalView';
import { ButtonText } from '../components/ButtonText';

import { theme } from "../styles/theme";
import { auth } from '../../config/firebase';
import { styles } from './styles';

export function HomeRoutes() {
  const [showModal, setShowModal] = useState(false);
  const { tasks, setTasks, getTasksData, user } = useContext(Context);
  const scheme = useTheme();
  const themeSystem = useColorScheme();
  const navigation = useNavigation();
  const { Navigator, Screen } = createNativeStackNavigator();

  const SETTINGS = [
    {
      id: '1',
      name: 'Sair',
      on_press: () => {handleSignOut()},
    },
  ];
  
  function handleNavigateTasksChecked() {
    navigation.navigate('TasksChecked');
  }

  function handleFilter(searchTask: string) {
    setTasks(
      tasks.filter(task => 
        task.name.toUpperCase().includes(searchTask.toUpperCase())
      )
    );
    if (searchTask === '') {
      getTasksData();
    }
  }

  function handleSignOut() {
    AsyncStorage.clear();
    signOut(auth);
  }

  function handleShowModalSettings() {
    setShowModal(!showModal);
  }

  return (
    <Navigator
      screenOptions={{
        headerTransparent: true,
        headerLargeTitle: true,
        headerLargeStyle: {
          backgroundColor: scheme.colors.background,
        },
        headerStyle: {
          backgroundColor: themeSystem === 'dark' ? '#1a1a1a' : '#D9D9D9',
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          presentation: 'card',
          title: 'Início',
          headerLeft: () => (
            <View>
              <ButtonIcon
                icon_name='menu'
                color={scheme.colors.text}
                onPress={handleShowModalSettings}
              />
              <ModalView
                visible={showModal}
                handleCloseModal={handleShowModalSettings}
                height={200}
              >
                <ScrollView
                  style={styles.modal}
                >
                  <Text style={[styles.titleModal, { color: scheme.colors.text }]}>
                    Configurações
                  </Text>
                  {SETTINGS.map(item =>
                    <View key={item.id} style={styles.itemSetting}>
                      <ButtonText
                        title={item.name}
                        onPress={item.on_press}
                      />
                    </View>
                  )}
                </ScrollView>
              </ModalView>
            </View>
          ),
          headerRight: () => (
            <View style={styles.user}>
              <Text style={[styles.name, { color: scheme.colors.text }]}>
                { user?.nome }
              </Text>
              <Image
                source={{ uri: user?.image_user }}
                style={styles.imageUser}
              />
            </View>
          ),
        }}
      />
      <Screen
        name="Tasks"
        component={Tasks}
        options={{
          title: 'Tarefas',
          headerTintColor: theme.orange,
          headerSearchBarOptions: {
            placeholder: 'Buscar',
            onChangeText: (event) => handleFilter(event.nativeEvent.text),
            onCancelButtonPress: () => getTasksData(),
          },
          headerRight: () => (
            <ButtonIcon
              icon_name='check-circle-outline'
              size={23}
              color={theme.blue}
              onPress={handleNavigateTasksChecked}
            />
          ),
        }}
      />
      <Screen
        name="TasksChecked"
        component={TasksChecked}
        options={{
          presentation: 'modal',
          title: 'Concluídos',
          headerTintColor: theme.blue,
        }}
      />
      <Screen
        name="TasksScheduled"
        component={TasksScheduled}
        options={{
          title: 'Agendados',
          headerTintColor: theme.orange,
        }}
      />
      <Screen
        name="TasksImportant"
        component={TasksImportant}
        options={{
          title: 'Importantes',
          headerTintColor: theme.purple,
        }}
      />
    </Navigator>
  );
}