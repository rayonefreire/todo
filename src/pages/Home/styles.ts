import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  header: {
    marginTop: 70,
    marginHorizontal: 24,
    flexDirection: 'row'
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#F2C91D'
  },
  main: {
    marginHorizontal: 24,
    marginTop: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  check: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'white',
    marginRight: 10,
  },
  titleItem: {
    fontSize: 20,
    color: 'white',
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: -3
  },
  input: {
    height: 32,
    width: 300,
    fontSize: 18,
    color: 'white',
    borderBottomWidth: 1,
  },
  divider: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 290,
    marginLeft: 38
  }
});