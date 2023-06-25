import React, { useState } from 'react';

import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { styles } from './styles';
import { auth, database } from '../../../config/firebase';

import { Button } from '../../components/Button';
import { HeaderContent } from '../../components/HeaderContent';

export function SignIn(){
  const [image, setImage] = useState(null);
  const [name, setName] = useState(String);
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);

  const scheme = useTheme();

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function handleSignIn() {
    createUserWithEmailAndPassword(auth, email, password)
      .then(data => {
        setDoc(doc(database, 'users', data.user.uid), {
          nome: name,
          image_user: image,
        })
      })
      .catch(error => console.log(error))
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <HeaderContent
            title='Crie sua conta'
            subtitle='Digíte seu nome e adicione uma foto para começar a ser mais produtivo'
          />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={pickImage}
          >
            <Image
              source={{
                uri: image ?
                image : 
                'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
              }}
              style={styles.image}
              resizeMode='contain'
            />
          </TouchableOpacity>

          <TextInput
            placeholder='Seu nome'
            onChangeText={setName}
            placeholderTextColor={scheme.colors.text}
            style={[
              styles.input, {
                backgroundColor: scheme.colors.border,
                color: scheme.colors.text
              }
            ]}
          />

          <TextInput
            placeholder='Email'
            onChangeText={setEmail}
            keyboardType='email-address'
            placeholderTextColor={scheme.colors.text}
            style={[
              styles.input, {
                backgroundColor: scheme.colors.border,
                color: scheme.colors.text
              }
            ]}
          />

          <TextInput
            placeholder='Senha'
            onChangeText={setPassword}
            keyboardType='visible-password'
            secureTextEntry
            placeholderTextColor={scheme.colors.text}
            style={[
              styles.input, {
                backgroundColor: scheme.colors.border,
                color: scheme.colors.text
              }
            ]}
          />

          <Button
            title='Entrar'
            onPress={handleSignIn}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}