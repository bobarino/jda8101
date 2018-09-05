import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


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
