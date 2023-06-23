import { StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -8,
    marginBottom: 4,
  },
  text: {
    fontSize: 18,
    color: theme.blue,
  },
});