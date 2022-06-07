import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  header: {
    marginTop: 70,
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginLeft: 37
  },
  headerModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 18,
    marginHorizontal: 24
  },
  titleModal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F2C91D',
  },
  mainModal: {
    marginTop: 10,
    marginHorizontal: 24
  }
});