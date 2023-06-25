import { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useTheme } from "@react-navigation/native";

import { Tasks } from "../screens/Tasks";
import { Home } from "../screens/Home";
import { TasksChecked } from "../screens/TasksChecked";
import { TasksScheduled } from "../screens/TasksScheduled";
import { TasksImportant } from "../screens/TasksImportant";
import { ButtonIcon } from "../components/ButtonIcon";
import { Context } from "../context";

import { theme } from "../styles/theme";
import { styles } from './styles';

export function HomeRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();
  const { tasks, setTasks, getTasksData } = useContext(Context);
  const scheme = useTheme();
  const navigation = useNavigation();
  
  function handleNavigateTasksChecked() {
    navigation.navigate('TasksChecked');
  }

  function handleNavigateHomeScreen() {
    navigation.navigate('Home');
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

  return (
    <Navigator   
      screenOptions={{
        headerLargeTitle: true,
        headerStyle: {
          backgroundColor: scheme.colors.background
        },
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.header}
            onPress={handleNavigateHomeScreen}
          >
            <MaterialCommunityIcons name="chevron-left" size={30} color={theme.blue}/>
            <Text style={styles.text}>Home</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Screen
        name="Tasks"
        component={Tasks}
        options={{
          title: 'Tarefas',
          headerTitleStyle: {
            color: theme.orange,
          },
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
              style={{ marginRight: 20 }}
            />
          ),
        }}
      />
      <Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Screen
        name="TasksChecked"
        component={TasksChecked}
        options={{ presentation: 'modal', headerShown: false }}
      />
      <Screen
        name="TasksScheduled"
        component={TasksScheduled}
        options={{
          headerTintColor: theme.orange,
          title: 'Agendados',
        }}
      />
      <Screen
        name="TasksImportant"
        component={TasksImportant}
        options={{
          headerTintColor: theme.purple,
          title: 'Importantes',
        }}
      />
    </Navigator>
  )
}