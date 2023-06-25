import { useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SignInRoutes } from "./auth.routes";
import { Context } from "../context";
import { HomeRoutes } from './home.routes';

import { auth } from '../../config/firebase';

export function Routes() {
  const { setUserId, userId } = useContext(Context);
  const theme = useColorScheme();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        AsyncStorage.setItem("@USER", user.uid);
      }
    });
  }, []);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      { userId ? <HomeRoutes /> : <SignInRoutes /> }
    </NavigationContainer>
  );
}