import { ReactNode, createContext, useEffect, useState } from "react";
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TaskProps } from "../components/Task";

export type User = {
  name: string;
  image_user: string;
}


type Props = {
  tasks: PropsTasks;
  setTasks: React.Dispatch<React.SetStateAction<PropsTasks>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;

  // Estdoa para edição de tarefa
  taskEdit: TaskProps;
  setTaskEdit: React.Dispatch<React.SetStateAction<TaskProps>>;
  textEdit: string;
  setTextEdit: React.Dispatch<React.SetStateAction<string>>;
  showFormEdit: boolean;
  setShowFormEdit: React.Dispatch<React.SetStateAction<boolean>>;

  // Estados para tema do aplicativo
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export type PropsTasks = {
  id: string;
  name: string;
  checked: boolean;
  time_notification: Date | null;
  id_notification: string | null;
  create_at: Date;
  important: boolean;
}[];

type PropsProvider = {
  children: ReactNode;
}

export const Context = createContext({} as Props);

export function Provider({ children } : PropsProvider) {
  const [tasks, setTasks] = useState<PropsTasks>([]);
  const [user, setUser] = useState<User>();

  // Estados para edição de tarefa
  const [taskEdit, setTaskEdit] = useState<TaskProps>();
  const [textEdit, setTextEdit] = useState(String);
  const [showFormEdit, setShowFormEdit] = useState(false);

  // Estados para alterar o tema do aplicativo
  const [theme, setTheme] = useState(useColorScheme());


  /////// Arrumar a funcionalidade da opção (Sistema)
  async function getTheme() {
    try {
      const themedata = await AsyncStorage.getItem('@THEME');
      if (themedata === 'light' && 'dark') {
        setTheme(themedata);
      } else if (themedata === 'null') {
        setTheme(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserData() {
    try {
      const userdata = await AsyncStorage.getItem('@USER');
      if (userdata) {
        setUser(JSON.parse(userdata));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getTasksData() {
    try {
      const tasksdata = await AsyncStorage.getItem('@TASKS');
      if (tasksdata) {
        setTasks(JSON.parse(tasksdata));
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUserData();
    getTasksData();
    getTheme();
  }, []);

  return (
    <Context.Provider
      value={{
        tasks,
        setTasks,
        user,
        setUser,

        // Estados para edição de tarefa
        taskEdit,
        setTaskEdit,
        textEdit,
        setTextEdit,
        showFormEdit,
        setShowFormEdit,

        // Estados para tema do aplicativo
        theme,
        setTheme,
      }}
    >
      { children }
    </Context.Provider>
  );
}