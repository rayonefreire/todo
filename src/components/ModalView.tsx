import { useColorMode, VStack } from 'native-base';
import { useContext } from 'react';
import { Modal, ModalProps, SafeAreaView, TouchableOpacity } from 'react-native';
import { Context } from '../context/auth';

type Props = ModalProps & {
  children: any;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
}

export function ModalView({ children, modal, setModal, ...rest } : Props) {
  const { colorMode } = useColorMode();

  return (
    <Modal
      visible={modal}
      transparent
      animationType='slide'
      {...rest}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
        <TouchableOpacity
          style={{ flex: 1, zIndex: 9 }}
          onPress={() => setModal(!modal)}
        >

        </TouchableOpacity>

        <VStack
          bg={ colorMode === 'dark' ? 'gray.400' : 'gray.200'}
          borderLeftRadius={10}
          borderRightRadius={10}
          px={6}
          py={5}
        >
          { children }
        </VStack>
      </SafeAreaView>
    </Modal>
  );
}