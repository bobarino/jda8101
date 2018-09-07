import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import email from 'react-native-email'


export default class Contact extends Component {
  state = { name: '', message: '' }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
      return (
          <View style={styles.container}>
            <TextInput
              style={{width: 250, padding: 20, borderColor: 'gray', borderWidth: 1}}
              autoCapitalize="none"
              placeholder="Name"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />
            <TextInput
              style={{width: 250, padding: 20, borderColor: 'gray', borderWidth: 1}}
              multiline = {true}
              numberOfLines = {5}
              placeholder="Message"
              onChangeText={message => this.setState({ message })}
              value={this.state.message}
            />
            <Button title="Contact" onPress={this.handleEmail} />
          </View>
      );
  }

  handleEmail = () => {
      const to = ['ngiammanco@gmail.com'] // Array of email addresses- Need to change to official email
      email(to, {
          cc: [], // Array of email addresses for cc
          bcc: [], // Array of email addresses for bcc
          subject: 'Exercise Level 0: A user sent a contact message',
          body: this.state.message + '\n From: ' + this.state.name
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
