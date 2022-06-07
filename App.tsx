import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Home } from './src/pages/Home';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
      <StatusBar style="light" translucent />
    </NavigationContainer>
  );
}
