import { Plus } from 'phosphor-react-native';
import { HStack, Input, IInputProps, IconButton, useColorMode } from 'native-base';

type Props = IInputProps & {
  setText: React.Dispatch<React.SetStateAction<string>>;
  addItem: any;
}

export function Form({ setText, addItem, ...rest } : Props) {
  const { colorMode } = useColorMode();
  
  return (
    <HStack
      px={6}
      pb={10}
      alignItems='center'
      justifyContent='space-between'
    >
      <Input
        h={10}
        w={320}
        borderWidth={0}
        fontFamily="body"
        color={ colorMode === 'dark' ? 'white' : 'black' }
        placeholderTextColor='gray.300'
        placeholder='Dígite sua tarefa'
        fontSize={18}
        keyboardAppearance={ colorMode === 'dark' ? 'dark' : 'light' }
        onChangeText={setText}
        autoFocus
        _focus={{
          bg: colorMode === 'dark' ? 'gray.700' : 'white'
        }}
        {...rest}
      />

      <IconButton
        onPress={addItem}
        icon={<Plus color={ colorMode === 'dark' ? 'white' : 'black' } size={25} />}
      />
    </HStack>
  );
}