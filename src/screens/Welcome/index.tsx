import React from 'react';

import {
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';

import animation from '../../animations/todo-animation.json';

import { styles } from './styles';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { HeaderContent } from '../../components/HeaderContent';

export function Welcome(){
  const navigation = useNavigation();

  function handleNavigateSignIn() {
    navigation.navigate("SignIn");
  }

  return (
    <View style={styles.container}>
      <HeaderContent
        title='Transforme suas metas em realidade'
        subtitle='Bem-vindo(a) ao app de lista de tarefas que impulsiona sua produtividade e te motiva a conquistar cada objetivo!'
      />

      <LottieView
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
        }}
        source={animation}
      />

      <Button
        title='Avançar'
        onPress={handleNavigateSignIn}
      />
    </View>
  );
}