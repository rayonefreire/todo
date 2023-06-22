import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 33,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: theme.orange,
    marginLeft: 10,
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    marginHorizontal: 10
  },
  text: {
    fontSize: 16,
  }
});