import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    marginTop: 70,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#F2C91D',
  },
  main: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 24,
    marginBottom: 55,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  titleItem: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
  },
  divider: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 290,
    marginLeft: 37,
    marginBottom: 8,
  },
});