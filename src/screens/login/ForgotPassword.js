import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class ForgotPassword extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Forgot Password</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
