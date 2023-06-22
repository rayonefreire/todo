import React, { useContext, useState } from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import { styles } from './styles';
import { theme } from '../../styles/theme';

import { ButtonIcon } from '../ButtonIcon';
import { Context } from '../../context';

export type TaskProps = {
  name: string;
  time_notification: Date | null;
  id: string;
  checked: boolean;
  create_at: Date;
  important: boolean;
  id_notification: string | null;
}

type Props = {
  task: TaskProps;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'] | null;
  handleCheckTask?: (taskId: string) => void;
  typeList?: string;
}

export function Task({
  task,
  icon = null,
  handleCheckTask,
  typeList,
} : Props){
  const {
    setTextEdit,
    setShowFormEdit,
    showFormEdit,
    setTaskEdit,
  } = useContext(Context);
  const scheme = useTheme();
  const formatTime = new Date(task.time_notification).toLocaleString();
  const [text, setText] = useState(task.name);

  function handleShowFormEdit() {
    setShowFormEdit(!showFormEdit);
    setTaskEdit(task);
  }

  return (
    <View style={{ paddingVertical: 9 }}>
      <View style={styles.container}>
        {handleCheckTask &&
          <ButtonIcon
            icon_name='checkbox-blank-circle-outline'
            color={theme.gray}
            size={32}
            onPress={() => handleCheckTask(task.id)}
          />
        }

        {icon &&
          <MaterialCommunityIcons name={icon} size={24} color={theme.blue} />
        }

        {showFormEdit ?
          <TextInput
            placeholder='Tarefa'
            value={text}
            style={[styles.input, { color: scheme.colors.text }]}
            autoFocus
            onBlur={handleShowFormEdit}
            onChangeText={text => {
              setTextEdit(text);
              setText(text);
            }}
          /> :
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleShowFormEdit}
          >
            <Text style={[styles.title, { color: scheme.colors.text }]}>
              { task.name }
            </Text>
          </TouchableOpacity>
        }

        {task.important && typeList === 'Tarefas' &&
          <MaterialCommunityIcons name='flag' size={24} color={theme.orange} />
        }
      </View>
      
      {task.time_notification &&
        <Text style={[
          styles.text, {
            marginTop: handleCheckTask ? 5 : 10,
            marginLeft: handleCheckTask ? 42 : 34,
            color: new Date() > task.time_notification ? 'red' : scheme.colors.text
          }
        ]}>
          { formatTime }
        </Text>
      }
    </View>
  );
}