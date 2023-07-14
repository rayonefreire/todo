import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 9,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 33,
    width: '80%',
    marginLeft: 10,
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    marginHorizontal: 10
  },
  text: {
    fontSize: 16,
  },
  actionSwapeable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});