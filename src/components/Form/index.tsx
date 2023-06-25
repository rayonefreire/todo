import React, { useContext, useState } from 'react';

import {
  TextInput,
  View
} from 'react-native';
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scheduleNotificationAsync } from 'expo-notifications';
import { useTheme } from '@react-navigation/native';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

import { styles } from './styles';
import { theme } from '../../styles/theme';
import { database } from '../../../config/firebase';

import { ButtonIcon } from '../ButtonIcon';
import { Context } from '../../context';
import { ModalView } from '../ModalView';
import { ButtonText } from '../ButtonText';

type Props = {
  handleShowForm: () => void;
}

export function Form({ handleShowForm } : Props){
  const [text, setText] = useState(String);
  const [important, setImportant] = useState(false);
  const [timeNotification, setTimeNotification] = useState(new Date);
  const [date, setDate] = useState(new Date());
  const [showModalDateTimePicker, setShowModalDateTimePicker] = useState(false);
  const { userId } = useContext(Context);
  const scheme = useTheme();

  function onChange(event, selectedDate) {
    const currentDate = selectedDate;
    setTimeNotification(currentDate);
  };

  function handleOpenModalDateTimePicker() {
    setShowModalDateTimePicker(true);
  };

  function handleCloseModalDateTimePicker() {
    setTimeNotification(null);
    setShowModalDateTimePicker(false);
  }

  function handleImportantTask() {
    setImportant(!important);
  }

  async function handleAddTask() {
    const id = uuid.v4().toString();
    setDoc(doc(database, 'users', userId, 'tasks', id), {
      id: id,
      name: text,
      checked: false,
      time_notification: timeNotification > date ? timeNotification : null,
      create_at: date,
      important: important,
      id_notification: '',
    })
      .then(async () => {
        if (timeNotification > date) {
          const diffTime = Math.abs(Number(timeNotification) - Number(date));
          const timeRes = diffTime / 1000;
          updateDoc(doc(database, 'users', userId, 'tasks', id), {
            id_notification: await schedulePushNotification(text, timeRes),
          })
          setTimeNotification(null);
          setText(null);
        }
      })
      .catch(error => console.log(error))
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
    <View  style={styles.container}>
      <TextInput
        placeholder='Tarefa'
        placeholderTextColor={theme.gray}
        value={text}
        autoFocus
        onBlur={handleShowForm}
        onChangeText={setText}
        style={[
          styles.input, {
            color: scheme.colors.text,
          }
        ]}
      />

      <ButtonIcon
        icon_name={important ? 'flag' : 'flag-outline'}
        size={28}
        color={theme.orange}
        onPress={handleImportantTask}
      />

      <ButtonIcon
        icon_name='clock-time-eight-outline'
        size={28}
        color={theme.orange}
        onPress={handleOpenModalDateTimePicker}
      />

      <ButtonIcon
        icon_name='plus'
        size={32}
        color={theme.orange}
        onPress={handleAddTask}
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