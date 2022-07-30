import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/auth";
import { AppRoutes } from "./app.routes";
import { SignInRoutes } from "./signed.routes";

export function Routes() {
  const { signed } = useContext(Context);

  return signed ? <AppRoutes /> : <SignInRoutes />;
}