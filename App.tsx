import { Loading } from "./src/components/Loading";
import { NativeBaseProvider, StatusBar } from "native-base";
import { THEME } from "./src/styles/theme";
import { useFonts,Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Routes } from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "./src/context/auth";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <NavigationContainer>
        <Provider>
          { fontsLoaded ? <Routes /> : <Loading/> }
        </Provider>
      </NavigationContainer>
      <StatusBar translucent />
    </NativeBaseProvider>
  );
}
