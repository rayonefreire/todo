import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";

const { Navigator, Screen } = createNativeStackNavigator();

export function SignInRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}