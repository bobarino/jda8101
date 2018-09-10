import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";

import LoginService from "../../services/LoginService";
import Spinner from "../../components/Spinner";
import Button from "../../components/Button";

import { LogoImage } from "../../Images";


export default class ForgotPassword extends Component {
  state = { email: "", errorMessage: "", showSpinner: false }

  sendReset = () => {
    this.setState({ showSpinner: true });
    LoginService.sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({ showSpinner: false, errorMesage: "The message has been sent." });
      })
      .catch(error => this.setState({ errorMessage: error.message, showSpinner: false }));
  }
  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <Spinner show={this.state.showSpinner} />
        <View style={styles.container}>
          <Image source={LogoImage}
            style={styles.logo} />
          <View style={{ width: "100%" }}>
            <Text style={styles.loginHeader}>Forgotten Password</Text>
            <Text style={styles.loginErrorMessage}>
              {this.state.errorMessage}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>
          <Button style={styles.backButton}
            onPress={() => this.props.navigation.navigate("Login")}>
            <Text style={styles.backButtonText}>&lt; Back</Text>
          </Button>
          <View style={{ width: "100%" }}>
            <Button style={styles.registerButton}
              onPress={this.sendReset}>
              <Text style={styles.registerButtonText}>Send Password Reset Email ></Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#324151",
    paddingTop: 30, // for top bar
  },
  logo: {
    height: 180,
    width: 220,
    borderRadius: 0,
    marginTop: 10,
  },
  inputContainer: {
    width: "100%",
  },
  textInput: {
    height: 40,
    width: "90%",
    marginLeft: 20,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    backgroundColor: "white",
    padding: 2
  },
  loginHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  },
  loginErrorMessage: {
    marginTop: 10,
    color: "red",
    textAlign: "center"
  },
  registerButton: {
    width: "100%",
    height: 100,
    backgroundColor: "green",
  },
  registerButtonText: {
    textAlign: "center",
    fontSize: 24,
    color: "white"
  },
  backButton: {
    width: "100%",
    height: 20
  },
  backButtonText: {
    textAlign: "center",
    fontSize: 12,
    color: "white"
  }
});
