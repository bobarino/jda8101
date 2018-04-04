import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import RootNavigation from './navigation/RootNavigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default () => (
  <View style={styles.container}>
    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
    <RootNavigation />
  </View>
)
