import AsyncStorage from "@react-native-async-storage/async-storage";
import { ColorMode, useColorMode } from "native-base";
import { createContext, useEffect, useState } from "react";

type Props = {
  signed: boolean;
  listConcluded: {
    id: string;
    name: string;
  }[];
  getUser(): Promise<void>;
  getListConcluded(): Promise<void>;
}

type Children = {
  children: any;
}

export const Context = createContext({} as Props);

export function Provider({ children } : Children) {
  const [user, setUser] = useState<null | string>(String);
  const [listConcluded, setListConcluded] = useState([]);

  async function getListConcluded() {
    const lista = await AsyncStorage.getItem("@LISTCONCLUDED");

    if (lista !== null) {
      setListConcluded(JSON.parse(lista));
    }
  }

  async function getUser() {
    const usuario = await AsyncStorage.getItem("@USER");

    if (usuario !== null) {
      setUser(usuario);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Context.Provider value={{ signed: !!user, getUser, listConcluded, getListConcluded }}>
      { children }
    </Context.Provider>
  )
}