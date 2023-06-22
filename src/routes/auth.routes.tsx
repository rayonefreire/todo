import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { SignIn } from "../screens/SignIn";
import { Welcome } from "../screens/Welcome";

export function SignInRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="Welcome"
        component={Welcome}
      />
      <Screen
        name="SignIn"
        component={SignIn}
      />
    </Navigator>
  )
}