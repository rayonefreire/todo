import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Check, List, PlusCircle, CheckCircle, Sun, Moon } from 'phosphor-react-native';
import { VStack, HStack, Heading, Center, Text, FlatList, useTheme, IconButton, useColorMode } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import { Form } from '../components/Form';
import { Item } from '../components/Item';
import { ModalView } from '../components/ModalView';
import { Context } from '../context/auth';
import { MotiView } from 'moti';

export function Home() {
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [form, setForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [list, setList] = useState([
    {id: '1', name: ''}
  ]);

  const { listConcluded, getSeconds, segundos } = useContext(Context);
  const { colors } = useTheme();
  const navigation = useNavigation();

  const {
    colorMode,
    setColorMode,
  } = useColorMode();

  // AsyncStorage.clear()

  function handleAddItem() {
    function geradorId() {
      const key = Math.random().toString(36).slice(-10);

      if (key in list) {
        const key = Math.random().toString(1000).slice(-10);
        setId(key);
      }

      setId(key);
      console.log(id);
    }

    geradorId();

    const item = {
      id: id,
      name: text,
    }

    list.push(item);
    AsyncStorage.setItem("@LIST", JSON.stringify(list));
    setText("");

    getSeconds();
  
    console.log(segundos);
    schedulePushNotification(segundos, text);
  }

  function handleLightMode() {
    if (colorMode === 'dark') {
      setColorMode('light');
    } else if (colorMode === 'light') {
      setColorMode('dark');
    }
  }

  function handleListCondluded() {
    navigation.navigate('ListConcluded');
    setModal(!modal);
  }

  function handleForm() {
    setForm(!form);
  }

  async function getList() {
    const lista = await AsyncStorage.getItem("@LIST");

    if (lista !== null) {
      setList(JSON.parse(lista));
    }
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <VStack flex={1} bg={ colorMode === 'dark' ? 'gray.700' : 'white'}>
        <HStack
          w="full"
          justifyContent="space-between"
          alignItems="center"
          bg={ colorMode === 'dark' ? 'gray.600' : 'gray.100' }
          pt={12}
          pb={5}
          px={6}
        >
          <Heading color="secondary.700" fontSize={28} fontFamily="heading">
            Tarefas
          </Heading>

          <IconButton
            icon={<List color="white" size={30} />}
            onPress={() => setModal(!modal)}
          />
        </HStack>

        <MotiView
          from={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            type: 'timing',
            duration: 1000,
          }}
          style={{ flex: 1 }}
        >
          <FlatList
            pt={5}
            data={list}
            extraData={list}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Item listConcluded={listConcluded} title={item.name} getList={getList} item={item} list={list} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center pt={100}>
                <Check color={colors.gray[300]} size={32} />
                <Text color="gray.300" fontSize="xl" fontFamily="body" mt={5} textAlign="center">
                  Você ainda não possui {'\n'}
                  tarefas
                </Text>
              </Center>
            )}
          />
        </MotiView>

        { form ? 
          <Form
            setText={setText}
            addItem={handleAddItem}
            onBlur={handleForm}
          /> 
          : 
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleForm}
          >
            <HStack
              alignItems="center"
              px={6}
              pb={10}
            >
              <PlusCircle color={colors.secondary[700]} size={28} />

              <Heading color="secondary.700" fontSize={20} fontFamily="body" ml={3}>
                Nova tarefa
              </Heading>
            </HStack>
          </TouchableOpacity>
        }   
      </VStack>





      <ModalView
        setModal={setModal}
        modal={modal}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleListCondluded}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <CheckCircle color={ colorMode === 'dark' ? 'white' : 'black' } size={28} />
          <Text
            fontSize={18}
            fontFamily="body"
            color={ colorMode === 'dark' ? 'white' : 'black' }
            ml={2}
            py={3}
          >
            Mostrar concluídos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLightMode}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          {
            colorMode === 'dark' ?
            <>
              <Sun color={ colorMode === 'dark' ? 'white' : 'black' } size={28} />
              <Text
                fontSize={18}
                fontFamily="body"
                color={ colorMode === 'dark' ? 'white' : 'black' }
                ml={2}
                py={3}
              >
                Claro
              </Text>
            </>
            :
            <>
              <Moon color='black' size={28} />
              <Text
                fontSize={18}
                fontFamily="body"
                color='black'
                ml={2}
                py={3}
              >
                Escuro
              </Text>
            </>
          }
        </TouchableOpacity>
      </ModalView>
    </KeyboardAvoidingView>
  );
}

async function schedulePushNotification(segundos, text) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Lembrete 👍",
      body: `Hora de concluir a tarefa: ${text}`,
    },
    trigger: { seconds: segundos },
  });
  console.log('Notificação enviada');
}