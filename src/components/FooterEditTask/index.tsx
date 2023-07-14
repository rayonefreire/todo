import React, { useContext, useState } from 'react';

import { View } from 'react-native';

import { cancelScheduledNotificationAsync, scheduleNotificationAsync } from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import { Timestamp, doc, updateDoc } from 'firebase/firestore';

import { theme } from '../../styles/theme';
import { styles } from './styles';
import { database } from '../../../config/firebase';

import { ButtonIcon } from '../ButtonIcon'
import { Context } from '../../context';
import { ButtonText } from '../ButtonText';
import { ModalView } from '../ModalView';

export function FooterEditTask(){
  const scheme = useTheme();

  const {
    userId,
    taskEdit,
    textEdit,
    setShowFormEdit,
  } = useContext(Context);

  const [importantEdit, setImportantEdit] = useState(taskEdit.important);
  const [timeNotificationEdit, setTimeNotificationEdit] = useState(taskEdit.time_notification);
  const [showModalDateTimePicker, setShowModalDateTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  async function handleEditTask() {
    cancelScheduledNotificationAsync(taskEdit.id_notification)
      .then(() => console.log('Notificação cancelada ' + taskEdit.id_notification))
      .catch(error => console.log(error));

    // Enviando uma nova notificação
    const time = timeNotificationEdit && timeNotificationEdit.seconds - Math.floor(Date.now() / 1000);
    const idNotification = timeNotificationEdit && await schedulePushNotification(textEdit, time);

    // Editando as propriedades da tarefa
    updateDoc(doc(database, 'users', userId, 'tasks', taskEdit.id), {
      name: textEdit,
      important: importantEdit,
      time_notification: timeNotificationEdit,
      id_notification: idNotification,
    });
    setShowFormEdit(false);
  }

  function handleImportantEdit() {
    setImportantEdit(!importantEdit);
  }

  function onChange(event, selectedDate) {
    const currentDate = Timestamp.fromDate(selectedDate);
    setTimeNotificationEdit(currentDate);
  }

  function handleOpenModalDateTimePicker() {
    setShowModalDateTimePicker(true);
  };

  function handleCloseModalDateTimePicker() {
    setTimeNotificationEdit(taskEdit.time_notification);
    setShowModalDateTimePicker(false);
  }
  
  async function schedulePushNotification(nameTask: string, time: number) {
    console.log(time)
    const identifier = await scheduleNotificationAsync({
      content: {
        title: "Lembrete",
        body: nameTask,
      },
      trigger: { seconds: time },
    })
    console.log('Notificação enviada ' + identifier);
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
          value={date}
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