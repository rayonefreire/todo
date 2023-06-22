import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.lightgray,
    height: 90,
    width: '47.9%',
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  }
});