import React, { useContext, useState, useEffect } from 'react';

import {
  FlatList,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cancelScheduledNotificationAsync } from 'expo-notifications';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { Task } from '../Task';
import { Divider } from '../Divider';
import { Context, PropsTasks } from '../../context';
import { Button } from '../Button';
import { EmptyComponent } from '../EmptyComponent';

import { database } from '../../../config/firebase';

type Props = {
  type: string;
}

export function TasksList({ type } : Props){
  const [tasksScreen, setTasksScreen] = useState<PropsTasks>([]);
  const { tasks, userId } = useContext(Context);

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

  function handleCheckTask(taskId: string, idNotification: string) {
    cancelScheduledNotificationAsync(idNotification);
    updateDoc(doc(database, 'users', userId, 'tasks', taskId), {
      checked: true,
      important: false,
      time_notification: null,
      id_notification: null,
    });
  }

  function handleClearTasksChecked() {
    const newTaskList = tasks.filter(task => task.checked === true);
    newTaskList.map(task => {
      deleteDoc(doc(database, 'users', userId, 'tasks', task.id));
    });
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
        renderItem={({ item }) =>
          <Task
            task={item}
            handleCheckTask={type === 'Tarefas' && handleCheckTask}
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