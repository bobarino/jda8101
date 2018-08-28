import React, {Component} from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';


export default class Contact extends Component {

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Contact</Text>
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
