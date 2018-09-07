import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import LoginService from "../../services/LoginService";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";

import { LogoImage } from "../../Images";
import { ORANGE1, ORANGE2 } from "../../Colors";


export default class Login extends Component {
  constructor(props) {
    super(props);
  }


  state = { email: "", password: "", errorMessage: "", showSpinner: false }

  // temp to hide the login screen during development
  componentDidMount() {
    // this.setState({ email: "test@athlete-physics.com", password: "password" }, () => this.handleLogin());
  }

  handleLogin() {
    const { email, password } = this.state;
    this.setState({ showSpinner: true });
    LoginService.login(email, password)
      .then(() => {
        this.setState({ email: "", password: "", showSpinner: false });
        this.props.navigation.navigate("MainNav");
      })
      .catch((error) => this.setState({ errorMessage: `Error: ${error.userInfo.NSLocalizedDescription}`, showSpinner: false }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner show={this.state.showSpinner} />
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
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.textInput}
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
        <Button style={styles.forgotPasswordButton}
          onPress={() => this.props.navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPasswordButtonText}>I forgot my password</Text>
        </Button>
        <View style={{ width: "100%" }}>
          <Button style={styles.loginButton}
            onPress={this.handleLogin.bind(this)}>
            <Text style={styles.buttonText}>Log In ></Text>
          </Button>
          <Button style={styles.registerButton}
            onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={styles.buttonText}>Register ></Text>
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
    textAlign: "center",
    height: 50
  },
  loginButton: {
    width: "100%",
    height: 100,
    // backgroundColor: ORANGE1,
    backgroundColor: "red"
    // backgroundColor: "#688bb0"
  },
  registerButton: {
    width: "100%",
    height: 100,
    // backgroundColor: ORANGE2,
    backgroundColor: "green"
    // backgroundColor: "#8197ae"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 24,
    color: "white"
  },
  forgotPasswordButton: {
    width: "100%",
    height: 20
  },
  forgotPasswordButtonText: {
    textAlign: "center",
    fontSize: 12,
    color: "white"
  }
});
