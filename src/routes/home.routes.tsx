import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Tasks } from "../screens/Tasks";
import { Home } from "../screens/Home";
import { TasksChecked } from "../screens/TasksChecked";
import { TasksScheduled } from "../screens/TasksScheduled";
import { TasksImportant } from "../screens/TasksImportant";

export function HomeRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="Tasks"
        component={Tasks}
      />
      <Screen
        name="Home"
        component={Home}
      />
      <Screen
        name="TasksChecked"
        component={TasksChecked}
        options={{ presentation: 'modal' }}
      />
      <Screen
        name="TasksScheduled"
        component={TasksScheduled}
      />
      <Screen
        name="TasksImportant"
        component={TasksImportant}
      />
    </Navigator>
  )
}