import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.overlay,
    marginBottom: -20,
  }
});