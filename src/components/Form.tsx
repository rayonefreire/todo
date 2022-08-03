import { Alert, Platform } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Plus, Alarm, CalendarBlank } from 'phosphor-react-native';
import { HStack, Input, IInputProps, IconButton, useColorMode, useTheme } from 'native-base';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = IInputProps & {
  setText: React.Dispatch<React.SetStateAction<string>>;
  addItem: any;
  text: string;
}

export function Form({ setText, addItem, text, ...rest } : Props) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const { colorMode } = useColorMode();
  const { colors } = useTheme();

  function onChange(event, selectedDate) {
    if (selectedDate < date) {
      Alert.alert('Ops!', 'Não é possível selecionar um horário antigo.');
    }
    
    else {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');

      const diffTime = Math.abs(currentDate - Number(date));
      const segundos = diffTime / 1000;

      console.log(segundos);
      
      schedulePushNotification(segundos, text);
    }
  }

  function showMode(currentMode) {
    setShow(!show);
    setMode(currentMode);
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
  return (
    <>
      <HStack
        px={6}
        pb={10}
        alignItems='center'
        justifyContent='space-between'
      >
        <Input
          h={10}
          w={240}
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
          onPress={() => showMode('date')}
          icon={<CalendarBlank color={ colorMode === 'dark' ? 'white' : 'black' } size={25} />}
        />

        <IconButton
          onPress={() => showMode('time')}
          icon={<Alarm color={ colorMode === 'dark' ? 'white' : 'black' } size={25} />}
        />

        <IconButton
          onPress={addItem}
          icon={<Plus color={ colorMode === 'dark' ? 'white' : 'black' } size={25} />}
        />
      </HStack>
      
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
          style={{ backgroundColor: colors.gray[200], marginHorizontal: 24, marginBottom: 24 }}
        />
      )}
    </>
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

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}