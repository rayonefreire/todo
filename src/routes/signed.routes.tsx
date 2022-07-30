import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { Welcome } from "../screens/Welcome";

const { Navigator, Screen } = createNativeStackNavigator();

export function SignInRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Welcome" component={Welcome} />
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}