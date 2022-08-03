import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  signed: boolean;
  listConcluded: {
    id: string;
    name: string;
  }[];
  getUser(): Promise<void>;
  getListConcluded(): Promise<void>;
  getSeconds(): Promise<void>;
  segundos: number;
}

type Children = {
  children: any;
}

export const Context = createContext({} as Props);

export function Provider({ children } : Children) {
  const [user, setUser] = useState<null | string>(String);
  const [listConcluded, setListConcluded] = useState([]);
  const [segundos, setSegundos] = useState(Number);

  async function getListConcluded() {
    const lista = await AsyncStorage.getItem("@LISTCONCLUDED");

    if (lista !== null) {
      setListConcluded(JSON.parse(lista));
    }
  }

  async function getSeconds() {
    const date = await AsyncStorage.getItem("@SECONDS");

    if (date !== null) {
      setSegundos(Number(date));
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
    <Context.Provider value={{ signed: !!user, getUser, listConcluded, getListConcluded, getSeconds, segundos }}>
      { children }
    </Context.Provider>
  )
}