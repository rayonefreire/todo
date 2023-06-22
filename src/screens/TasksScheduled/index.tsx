import React from 'react';

import {
  View,
  SafeAreaView,
} from 'react-native';

import { styles } from './styles';

import { TasksList } from '../../components/TasksList';

export function TasksScheduled(){
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TasksList
          type='Agendados'
          buttonNavigate
        />
      </View>
    </SafeAreaView>
  );
}