import { useContext } from 'react';
import { ColorSchemeName } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { SignInRoutes } from "./auth.routes";
import { Context } from "../context";
import { HomeRoutes } from './home.routes';

export function Routes() {
  const { user, theme } = useContext(Context);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      { user ? <HomeRoutes /> : <SignInRoutes /> }
    </NavigationContainer>
  );
}