import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Constants } from 'expo'

import { backgroundColor } from './constants/Colors'
import RootNavigation from './navigation/RootNavigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
  statusBar: {
    backgroundColor,
    height: Constants.statusBarHeight,
  },
})

export default () => (
  <View style={styles.container}>
    <View style={styles.statusBar} />
    <RootNavigation />
  </View>
)
