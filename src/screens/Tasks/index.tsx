import React, { useContext, useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View
} from 'react-native';

import { styles } from './styles';
import { theme } from '../../styles/theme';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Form } from '../../components/Form';
import { TasksList } from '../../components/TasksList';
import { Context } from '../../context';
import { FooterEditTask } from '../../components/FooterEditTask';

export function Tasks(){
  const [showForm, setShowForm] = useState(false);
  const { showFormEdit } = useContext(Context);

  function handleShowForm() {
    setShowForm(!showForm);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TasksList
            type='Tarefas'
            action
            buttonNavigate
          />

          {showForm ?
            <Form
              handleShowForm={handleShowForm}
            /> :
            <ButtonIcon
              icon_name='plus'
              size={40}
              color={theme.white}
              onPress={handleShowForm}
              style={styles.button}
            /> && showFormEdit ?
            <FooterEditTask /> :
            <ButtonIcon
              icon_name='plus'
              size={40}
              color={theme.white}
              onPress={handleShowForm}
              style={styles.button}
            />
          }
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}