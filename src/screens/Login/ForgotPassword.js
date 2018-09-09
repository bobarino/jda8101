import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";


export default class ForgotPassword extends Component {
    state = { email: "", errorMessage: "", showSpinner: false }

    handleSignUp = () => {
        this.setState({ showSpinner: true });
        LoginService.sendPasswordResetEmail(email)
        .then(() => {
            this.setState({showSpinner: false });
        })
        .catch(error => this.setState({ errorMessage: error.message, showSpinner: false }));
    }
  render() {
    return (
      <View style={styles.container}>
        <Text>Forgot Password</Text>
      <Spinner show={this.state.showSpinner} />
      <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
      />
      <View style={{ width: "100%" }}>
        <Button style={styles.registerButton}
          onPress={this.sendReset}>
        <Text style={styles.registerButtonText}>Send Password Reset Email ></Text>
        </Button>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
