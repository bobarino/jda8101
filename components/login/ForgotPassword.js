import React, {Component} from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import firebase from 'react-native-firebase';


export default class ForgotPassword extends Component {

  static navigationOptions: {
    header: 'none'
  }

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
