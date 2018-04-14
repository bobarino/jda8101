import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  workoutType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutName: {
    fontSize: 16,
  },
  exercises: {
    paddingBottom: 10,
  },
  exercise: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 20,
    paddingRight: 20,
  },
  exerciseReps: {
    alignItems: 'flex-end',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
  },
})
