import React, {Component} from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';


export default class Log extends Component {

  // static navigationOptions = {
  //   header: 'none'
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>Log</Text>
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
