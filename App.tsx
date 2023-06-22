import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Context, Provider } from './src/context';
import * as Notifications from 'expo-notifications';
import { Routes } from './src/routes';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const { theme } = useContext(Context);
  
  return (
    <Provider>
      <Routes />
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </Provider>
  );
}
