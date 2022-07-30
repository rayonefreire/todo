import { VStack, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

import { Button } from '../components/Button';
import Animation from '../lf30_editor_hatnoumv.json';

export function Welcome() {
  const navigation = useNavigation();
  
  return (
    <VStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      bg="gray.700"
    >
      <Heading fontFamily="body" color="white" fontSize={30} >
        Bem vindo!
      </Heading>

      <Lottie
        source={Animation}
        autoPlay
        autoSize
        resizeMode='contain'
        loop
      />

      <Button
        title="Próximo"
        onPress={() => navigation.navigate('Login')}
      />
    </VStack>
  );
}