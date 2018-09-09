import React, { Component } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { createStackNavigator } from "react-navigation";
import Button from "../../components/Button";
import email from "react-native-email";


class Feedback extends Component {
  state = { name: "", message: "" };

  componentDidMount() {
    console.log(this.props);
  }

  handleEmail = () => {
    const to = ["ngiammanco@gmail.com"]; // Array of email addresses- Need to change to official email
    email(to, {
      cc: [], // Array of email addresses for cc
      bcc: [], // Array of email addresses for bcc
      subject: "Exercise Level 0: A user sent a Feedback message",
      body: `${this.state.message}\n From: ${this.state.name}`
    }).catch(console.error);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.label}>Please fill this out to provide feedback on the app:</Text>
          <TextInput
            style={{ marginTop: 20, width: "100%", padding: 10, borderColor: "gray", borderWidth: 1 }}
            autoCapitalize="none"
            placeholder="Name"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
            style={styles.messageInput}
            multiline
            numberOfLines={10}
            placeholder="Message"
            onChangeText={message => this.setState({ message })}
            value={this.state.message}
          />
        </View>
        <Button style={styles.submitButton} onPress={this.handleEmail}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center"
  },
  label: {
    fontSize: 20,
    fontWeight: "600"
  },
  topContainer: {
    width: "90%",
    alignItems: "center",
    marginTop: 20,
  },
  bottomContainer: {
    width: "90%",
    alignItems: "center",
    marginTop: 20,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto"
  },
  messageInput: {
    marginTop: 10,
    height: "100%",
    width: "100%",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1
  },
  submitButton: {
    marginTop: 30,
    height: 100,
    width: "100%",
    backgroundColor: "green"
  },
  submitButtonText: {
    textAlign: "center",
    fontSize: 24,
    color: "white"
  }
});

export default function FeedbackScreen(navigationOptionsFunc) {
  return createStackNavigator(
    { Feedback: { screen: Feedback } }, { navigationOptions: navigationOptionsFunc }
  );
}
