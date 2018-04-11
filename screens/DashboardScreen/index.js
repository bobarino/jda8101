import React from 'react'
import { View, Text, Button, Image } from 'react-native'

import styles from './styles'

export default () => (
  <View style={styles.container}>
    <Text style={styles.titleText}>Today{"\'"}s Workout</Text>
    <Text style={styles.bodyText}>Relative Strength:{"\n"}Week A Wednesday</Text>
    <View style={styles.buttonContainer}>
      <Button
        onPress={() => {

        }}
        title="Begin"
      />
    </View>
    <Text style={styles.bodyText}>My Workout History:</Text>
    <Image
      source={require('../../assets/images/TRIMP.png')}
    />
  </View>
)
