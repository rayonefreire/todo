import React from 'react';

import {
  FlatList,
  View,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { theme } from '../../styles/theme';

import { ItemHome } from '../../components/ItemHome';

const ITENS = [
  {
    id: '1',
    name: 'Tarefas',
    icon_name: 'check' as React.ComponentProps<typeof MaterialCommunityIcons>['name'],
    color: theme.blue,
    route: 'Tasks',
  },
  {
    id: '2',
    name: 'Agendados',
    icon_name: 'clock-time-eight-outline' as React.ComponentProps<typeof MaterialCommunityIcons>['name'],
    color: theme.orange,
    route: 'TasksScheduled',
  },
  {
    id: '3',
    name: 'Importantes',
    icon_name: 'flag-outline' as React.ComponentProps<typeof MaterialCommunityIcons>['name'],
    color: theme.purple,
    route: 'TasksImportant',
  },
];

export function Home(){
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={ITENS}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          numColumns={2}
          renderItem={({ item }) => 
            <ItemHome
              title={item.name}
              icon={item.icon_name}
              color={item.color}
              route={item.route}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}