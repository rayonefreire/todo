import { Button as NativeBaseButton, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
  title: string;
}

export function Button({ title, ...rest } : Props) {
  return (
    <NativeBaseButton
      mx={6}
      mb={10}
      h={12}
      bg="blue.400"
      borderRadius={5}
      { ...rest }
    >
      <Heading fontFamily='body' fontSize={20}>
        { title }
      </Heading>
    </NativeBaseButton>
  );
}