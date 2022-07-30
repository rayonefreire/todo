import { HStack, Text, useColorMode } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  title: string;
  item: any;
  list: any;
  listConcluded: any;
  getList(): Promise<void>;
}

export function Item({ title, item, list, getList, listConcluded } : Props ) {
  const { colorMode } = useColorMode();

  return (
    <HStack alignItems="center" px={6} mt={3}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          const isMe = (element) => element.id === item.id;
          const pos = list.findIndex(isMe);
          list.splice(pos, 1);
          AsyncStorage.setItem("@LIST", JSON.stringify(list));
          getList();

          listConcluded.push(item);
          AsyncStorage.setItem("@LISTCONCLUDED", JSON.stringify(listConcluded));
        }}
      >
        <View style={{
            borderWidth: 1,
            height: 30,
            width: 30,
            borderRadius: 15,
            borderColor: colorMode === 'dark' ? 'white' : 'black'
          }} 
        />
      </TouchableOpacity>

      <Text color={ colorMode === 'dark' ? 'white' : 'black' } fontSize={20} ml={3} fontFamily="body">{ title }</Text>
    </HStack>
  );
}