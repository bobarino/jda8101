import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import LoginService from "../../services/LoginService";
import Button from "../../components/Button";

import { LogoImage } from "../../Images";


export default class Login extends Component {
  constructor(props) {
    super(props);
  }


  state = { email: "", password: "", errorMessage: "" }



  handleLogin() {
    const { email, password } = this.state;
    LoginService.login(email, password)
      .then(() => this.props.navigation.navigate("DrawNav"))
      .catch((error) => { this.setState({ errorMessage: `Error: ${error.userInfo.NSLocalizedDescription}` }); });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={LogoImage}
          style={styles.logo} />
        <View style={{ width: "100%" }}>
          <Text style={styles.loginHeader}>Login</Text>
          <Text style={styles.loginErrorMessage}>
            {this.state.errorMessage}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Button style={styles.loginButton}
            onPress={this.handleLogin.bind(this)}>
            <Text style={styles.loginButtonText}>Log In ></Text>
          </Button>
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
  loginButton: {
    width: "100%",
    height: 100,
    backgroundColor: "red",
  },
  loginButtonText: {
    textAlign: "center",
    fontSize: 24,
    color: "white"
  }
});
