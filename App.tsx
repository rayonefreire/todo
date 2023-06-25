import { StatusBar } from 'expo-status-bar';
import { Provider } from './src/context';
import * as Notifications from 'expo-notifications';
import { Routes } from './src/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

//AsyncStorage.clear()

export default function App() {
  return (
    <Provider>
      <Routes />
      <StatusBar style='auto' />
    </Provider>
  );
}
