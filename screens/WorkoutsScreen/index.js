import React from 'react'
import { View, Text, FlatList } from 'react-native'

import styles from './styles'
import info from './data'

export default () => (
  <FlatList
    data={info}
    renderItem={({ item }) => (
      <View style={styles.containter}>
        <View style={styles.heading}>
          <Text style={styles.workoutType}> { item.type } </Text>
          <Text style={styles.workoutName}> { item.workout } </Text>
        </View>
        <View style={styles.exercises}>
          {
            <View style={styles.exercise} key={item.workout}>
              <View style={styles.exerciseName} key={item.workout}>
                {
                  item.exercises.map(wo => (
                    <Text style={styles.exerciseNameText} key={item.workout}> { wo.name } </Text>
                  ))
                }
              </View>
              <View style={styles.exerciseReps} key={item.workout}>
                {
                  item.exercises.map(wo => (
                    <Text style={styles.exerciseRepsText} key={item.workout}> { wo.reps } </Text>
                  ))
                }
              </View>
            </View>
          }
        </View>
      </View>
    )}
    keyExtractor={(item, index) => index.toString()}
    ItemSeparatorComponent={() => (<View style={styles.separator} />)}
  />
)
