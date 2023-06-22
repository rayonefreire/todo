import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent :'space-between',
    marginBottom: 10,
    width: '100%',
  },
  input: {
    height: 48,
    width: '57%',
    fontSize: 18,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: theme.orange,
  },
  headerModal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
});