import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { ListConcluded } from "../screens/ListConcluded";
import { Login } from "../screens/Login";
import { Welcome } from "../screens/Welcome";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="ListConcluded" component={ListConcluded} />
    </Navigator>
  );
}