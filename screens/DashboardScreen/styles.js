import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    flexDirection: 'column',
    fontSize: 40,
    fontWeight: 'bold',
    padding: 15,
  },
  bodyText: {
    flexDirection: 'column',
    fontSize: 25,
    padding: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    backgroundColor: 'blue',
    width: 150,
    padding: 15,
  },
  border: {
    borderBottomWidth: 2,
    alignSelf: 'stretch',
    padding: 15,
  },
})
