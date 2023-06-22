import React, { useContext, useState } from 'react';

import {
  View
} from 'react-native';
;
import { cancelScheduledNotificationAsync, scheduleNotificationAsync } from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';

import { theme } from '../../styles/theme';
import { styles } from './styles';

import { ButtonIcon } from '../ButtonIcon'
import { Context } from '../../context';
import { ButtonText } from '../ButtonText';
import { ModalView } from '../ModalView';

export function FooterEditTask(){
  const scheme = useTheme();

  const {
    tasks,
    taskEdit,
    textEdit,
    setShowFormEdit,
    showFormEdit,
  } = useContext(Context);

  const [importantEdit, setImportantEdit] = useState(taskEdit.important);
  const [timeNotificationEdit, setTimeNotificationEdit] = useState(taskEdit.time_notification);
  const [showModalDateTimePicker, setShowModalDateTimePicker] = useState(false);

  async function handleEditTask() {
    cancelScheduledNotificationAsync(taskEdit.id_notification)
      //.then(() => console.log('Notificação cancelada ' + taskEdit.id_notification))
      //.catch(error => console.log(error));

    // Editando as propriedades da tarefa
    taskEdit.name = textEdit;
    taskEdit.important = importantEdit;
    taskEdit.time_notification = timeNotificationEdit;

    // Enviando uma nova notificação
    const diffTime = Math.abs(Number(timeNotificationEdit) - Number(new Date()));
    const timeRes = diffTime / 1000;
    taskEdit.id_notification = await schedulePushNotification(taskEdit.name, timeRes);

    // Salvando lista de tarefas atualizada
    try {
      await AsyncStorage.setItem('@TASKS', JSON.stringify(tasks))
        .then(() => {
          console.log('Tarefa editada salva');
          setShowFormEdit(!showFormEdit);
        })
        .catch(error => console.log(error));
    } catch (e) {
      console.log(e);
    }
  }

  function handleImportantEdit() {
    setImportantEdit(!importantEdit);
  }

  function onChange(event, selectedDate) {
    const currentDate = selectedDate;
    setTimeNotificationEdit(currentDate);
  };

  function handleOpenModalDateTimePicker() {
    setShowModalDateTimePicker(true);
  };

  function handleCloseModalDateTimePicker() {
    setTimeNotificationEdit(null);
    setShowModalDateTimePicker(false);
  }
  
  async function schedulePushNotification(nameTask: string, time: number) {
    const identifier = await scheduleNotificationAsync({
      content: {
        title: "Lembrete",
        body: nameTask,
      },
      trigger: { seconds: time },
    })
    //console.log('Notificação enviada ' + identifier);
    return identifier;
  }

  return (
    <View style={styles.container}>
      <ButtonIcon
        icon_name={importantEdit ? 'flag' : 'flag-outline'}
        color={theme.orange}
        onPress={handleImportantEdit}
      />
      <ButtonIcon
        icon_name='clock-time-eight-outline'
        color={theme.orange}
        onPress={handleOpenModalDateTimePicker}
      />
      <ButtonIcon
        icon_name='check'
        color={theme.orange}
        onPress={handleEditTask}
      />

      <ModalView
        visible={showModalDateTimePicker}
        handleCloseModal={handleCloseModalDateTimePicker}
      >
        <View style={styles.headerModal}>
          <ButtonText
            title='Cancelar'
            titleColor={theme.blue}
            onPress={handleCloseModalDateTimePicker}
          />
          <ButtonText
            title='Aplicar'
            titleColor={theme.blue}
            onPress={() => setShowModalDateTimePicker(false)}
          />
        </View>
        
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode='datetime'
          locale='pt-br'
          display='spinner'
          textColor={scheme.colors.text}
          onChange={onChange}
        />
      </ModalView>
    </View>
  );
}