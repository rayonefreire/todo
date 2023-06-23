import React, { useContext, useState, useEffect } from 'react';

import {
  FlatList,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Task } from '../Task';
import { Divider } from '../Divider';
import { Context, PropsTasks } from '../../context';
import { Button } from '../Button';
import { EmptyComponent } from '../EmptyComponent';

type Props = {
  type: string;
}

export function TasksList({ type } : Props){
  const [tasksScreen, setTasksScreen] = useState<PropsTasks>([]);
  const { tasks, setTasks } = useContext(Context);

  function checkTypeIconTask() {
    let iconName = "" as React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    if (type === 'Agendados') {
      iconName = 'clock-time-eight-outline';
    } else if (type === 'Concluídos') {
      iconName = 'check';
    } else if (type === 'Importantes') {
      iconName = 'flag-outline';
    }
    return iconName;
  }

  function handleCheckTask(taskId: string) {
    const tasksUpdated = tasks.map(task => {
      if (task.id === taskId) {
        task.checked = true;
        task.important = false;
        task.time_notification = null;
        task.id_notification = null;
      }
      return task;
    });
    setTasks(tasksUpdated);
  }

  async function handleClearTasksChecked() {
    const newTaskList = tasks.filter(task => task.checked === false);
    setTasks(newTaskList);
    try {
      await AsyncStorage.setItem('@TASKS', JSON.stringify(newTaskList));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (type === 'Concluídos') {
      setTasksScreen(tasks.filter(task => task.checked === true));
    } else if (type === 'Agendados') {
      setTasksScreen(tasks.filter(task => task.time_notification !== null));
    } else if (type === 'Tarefas') {
      setTasksScreen(tasks.filter(task => task.checked === false));
    } else if (type === 'Importantes') {
      setTasksScreen(tasks.filter(task => task.important === true));
    }
  }, [tasks]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tasksScreen}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 20 }}
        renderItem={({ item }) =>
          <Task
            task={item}
            handleCheckTask={ type === 'Tarefas' && handleCheckTask }
            icon={checkTypeIconTask()}
            typeList={type}
          />
        }
        ItemSeparatorComponent={() => 
          <Divider />
        }
        ListEmptyComponent={() => 
          <EmptyComponent typeList={type} />
        }
      />

      {type === 'Concluídos' &&
        <Button
          title='Apagar concluídos'
          onPress={handleClearTasksChecked}
        />
      }
    </View>
  );
}