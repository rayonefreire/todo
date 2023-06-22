import React from 'react';

import {
  View,
  Text
} from 'react-native';
import LottieView from 'lottie-react-native';

import CheckAnimation from '../../animations/check.json';
import TaskAnimation from '../../animations/task.json';
import ScheduledAnimation from '../../animations/scheduled.json';
import ImportantAnimation from '../../animations/important.json';

type Props = {
  typeList: string;
}

export function EmptyComponent({ typeList } : Props){

  function sizeAnimation() {
    let size = 0;
    if (typeList === 'Tarefas') {
      size = 200
    } else if (typeList === 'Concluídos') {
      size = 120
    } else if (typeList === 'Agendados') {
      size = 230
    } else if (typeList === 'Importantes') {
      size = 140
    }
    return size;
  }

  return (
    <View style={{ marginTop: 120, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        autoPlay
        loop
        style={{
          width: sizeAnimation(),
          height: sizeAnimation(),
        }}
        source={
          typeList === 'Tarefas' &&
          TaskAnimation ||
          typeList === 'Concluídos' &&
          CheckAnimation ||
          typeList === 'Agendados' &&
          ScheduledAnimation ||
          typeList === 'Importantes' &&
          ImportantAnimation
        }
      />

      <Text style={{
        fontSize: 20,
        color: 'gray',
        textAlign: 'center',
        lineHeight: 28,
      }}>
        {
          typeList === 'Tarefas' &&
          'Sem tarefas' ||
          typeList === 'Concluídos' &&
          `Todas as tarefas foram ${'\n'} concluídas` ||
          typeList === 'Agendados' &&
          'Sem tarefas agendadas' ||
          typeList === 'Importantes' &&
          'Sem tarefas marcadas'
        }
      </Text>
    </View>
  );
}