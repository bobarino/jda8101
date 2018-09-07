import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import email from 'react-native-email'


export default class Contact extends Component {

  componentDidMount() {
    console.log(this.props);
  }

  render() {
      return (
          <View style={styles.container}>
              <Button title="Contact" onPress={this.handleEmail} />
          </View>
      )
  }

  handleEmail = () => {
      const to = ['ngiammanco@gmail.com'] // string or array of email addresses
      email(to, {
          // Optional additional arguments
          cc: [], // string or array of email addresses
          bcc: [], // string or array of email addresses
          subject: 'A user sent a contact message',
          body: 'CONTACTING'
      }).catch(console.error)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
