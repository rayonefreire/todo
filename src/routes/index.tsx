import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Home } from "../pages/Home";
import { TasksConcluded } from "../pages/TasksConcluded";

export default function Routes() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TaksConcluded" component={TasksConcluded} />
    </Stack.Navigator>
  );
}