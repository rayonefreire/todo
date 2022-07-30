import { TouchableOpacity, View } from 'react-native';
import { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CaretLeft, Notepad } from 'phosphor-react-native';
import { VStack, HStack, Heading, FlatList, Text, useTheme, IconButton, Center, useColorMode } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';
import { Context } from '../context/auth';

type Props = {
  title: string;
}

export function ListConcluded() {
  const { listConcluded, getListConcluded } = useContext(Context);

  const { colorMode } = useColorMode();

  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleCleanList() {
    listConcluded.splice(0);
    AsyncStorage.setItem("@LISTCONCLUDED", JSON.stringify(listConcluded));
    getListConcluded();
  }

  function ItemConcluded({ title } : Props) {
    return (
      <VStack px={6}>
        <Text color={ colorMode === 'dark' ? 'white' : 'black' } fontSize={20} fontFamily="body" ml={4} mb={1}>
          { title }
        </Text>

        <View style={{ borderWidth: 1, borderColor: colors.gray[400], width: '100%', marginVertical: 5 }} />
      </VStack>
    );
  }

  useEffect(() => {
    getListConcluded();
  }, []);

  return (
    <VStack flex={1} bg={ colorMode === 'dark' ? 'gray.700' : 'white'}>
      <VStack
        w="full"
        bg={ colorMode === 'dark' ? 'gray.600' : 'gray.100' }
        pt={12}
        pb={5}
        px={6}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={{ alignItems: 'center', flexDirection: 'row', marginLeft: -10 }}
        >
          <CaretLeft color={colors.blue[500]} size={30} />
          <Text color="blue.500" fontFamily="body" fontSize={20}>Tarefas</Text>
        </TouchableOpacity>

        <Heading color="secondary.700" fontSize={28} fontFamily="heading" mt={5}>
          Tarefas Concluídas
        </Heading>

        <Text color='gray.300' fontSize={18} fontFamily="body" mt={2}>{ listConcluded.length } Concluídos</Text>
      </VStack>

      <FlatList
        pt={5}
        data={listConcluded}
        extraData={listConcluded}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemConcluded title={item.name} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <Center pt={100}>
            <Notepad color={colors.gray[300]} size={32} />
            <Text color="gray.300" fontSize="xl" fontFamily="body" mt={5} textAlign="center">
              Você ainda não possui {'\n'}
              tarefas concluídas
            </Text>
          </Center>
        )}
      />

      {
        listConcluded.length === 0 ?
        <HStack></HStack>
        : 
        <Button
          title="Limpar concluídos"
          onPress={handleCleanList}
        />
      }
    </VStack>
  );
}