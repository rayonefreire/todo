import { Context } from '../context/auth';
import { useContext, useState } from 'react';
import { VStack, Heading, Text } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

export function Login() {
  const [signed, setSigned] = useState('no signed');

  const { getUser } = useContext(Context);

  function handleHome() {
    setSigned('sigend');
    AsyncStorage.setItem("@USER", signed);
    getUser();
  }
  
  return (
    <VStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      bg="gray.700"
      px={6}
    >
      <Heading
        fontFamily="body"
        fontSize={30}
        color="secondary.700"
        mb={100}
      >
        To-Do-App
      </Heading>

      <Text
        fontFamily="body"
        fontSize={20}
        color="gray.300"
        textAlign="center"
        mb={100}
      >
        Seja mais produtivo, com o app ToDo você consegue ser mais organizado
      </Text>

      <Button
        title="Começar"
        onPress={handleHome}
      />
    </VStack>
  );
}