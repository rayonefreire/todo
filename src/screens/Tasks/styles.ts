import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.orange,
    height: 48,
    width: 48,
    borderRadius: 24,
    marginRight: 'auto',
    marginBottom: 20,
  }
});