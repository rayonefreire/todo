import { ReactNode, createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Unsubscribe } from "firebase/auth";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";

import { TaskProps } from "../components/Task";

import { database } from "../../config/firebase";

export type User = {
  nome: string;
  image_user: string;
}

type Props = {
  tasks: PropsTasks;
  setTasks: React.Dispatch<React.SetStateAction<PropsTasks>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  getTasksData: () => Promise<Unsubscribe>;

  // Estados para edição de tarefa
  taskEdit: TaskProps;
  setTaskEdit: React.Dispatch<React.SetStateAction<TaskProps>>;
  textEdit: string;
  setTextEdit: React.Dispatch<React.SetStateAction<string>>;
  showFormEdit: boolean;
  setShowFormEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export type PropsTasks = {
  name: string;
  time_notification: {
    seconds: number;
  } | null;
  id: string;
  checked: boolean;
  create_at: Date;
  important: boolean;
  id_notification: string | null;
}[];

type PropsProvider = {
  children: ReactNode;
}

export const Context = createContext({} as Props);

export function Provider({ children } : PropsProvider) {
  const [tasks, setTasks] = useState<PropsTasks>([]);
  const [user, setUser] = useState<User>();
  const [userId, setUserId] = useState(String);

  // Estados para edição de tarefa
  const [taskEdit, setTaskEdit] = useState<TaskProps>();
  const [textEdit, setTextEdit] = useState(String);
  const [showFormEdit, setShowFormEdit] = useState(false);

  async function getUserData() {
    try {
      const userdata = await AsyncStorage.getItem('@USER');
      if (userdata) {
        setUserId(userdata);
        if (userId) {
          const docRef = doc(database, 'users', userId);
          const unsubscribe = onSnapshot(docRef, querySnapshot => {
            const data = querySnapshot.data() as User;
            setUser(data);
          });
          return unsubscribe;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getTasksData() {
    if (userId)  {
      const collectionRef = collection(database, 'users', userId, 'tasks');
      const unsubscribe = onSnapshot(query(collectionRef, orderBy('create_at', 'asc')), querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data()) as PropsTasks;
        setTasks(data);
      });
      return unsubscribe;
    }
  }

  useEffect(() => {
    getUserData();
    getTasksData();
  }, [userId]);

  return (
    <Context.Provider
      value={{
        tasks,
        setTasks,
        user,
        setUser,
        userId,
        setUserId,
        getTasksData,

        // Estados para edição de tarefa
        taskEdit,
        setTaskEdit,
        textEdit,
        setTextEdit,
        showFormEdit,
        setShowFormEdit,
      }}
    >
      { children }
    </Context.Provider>
  );
}