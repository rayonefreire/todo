import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.blue,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: theme.white
  }
});