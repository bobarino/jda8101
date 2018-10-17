import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import LoginService from "../../services/LoginService";

import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { LogoImage } from "../../Images";


export default class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    team: "",
    errorMessage: "",
    showSpinner: false
  }

  handleSignUp = () => {
    this.setState({ showSpinner: true });
    LoginService.register(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.team)
      .then(() => {
        this.setState({ email: "", password: "", team: "", errorMessage: "", showSpinner: false });
        this.props.navigation.navigate("MainNav");
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
            <Text style={styles.loginHeader}>Sign Up</Text>
            <Text style={styles.loginErrorMessage}>
              {this.state.errorMessage}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="First Name"
              autoCapitalize="words"
              style={styles.textInput}
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
            />
            <TextInput
              placeholder="Last Name"
              autoCapitalize="words"
              style={styles.textInput}
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
            />
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              placeholder="Password"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TextInput
              placeholder="Team Code"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={team => this.setState({ team })}
              value={this.state.team}
            />
          </View>
          <Button style={styles.backButton}
            onPress={() => this.props.navigation.navigate("Login")}>
            <Text style={styles.backButtonText}>I already have an account</Text>
          </Button>
          <View style={{ width: "100%" }}>
            <Button style={styles.registerButton}
              onPress={this.handleSignUp}>
              <Text style={styles.registerButtonText}>Sign Up ></Text>
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
