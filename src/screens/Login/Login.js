import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Dimensions, Animated } from "react-native";
import LoginService from "../../services/LoginService";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";

import { LogoImage } from "../../Images";
import { ORANGE1, ORANGE2 } from "../../Colors";


export default class Login extends Component {
  constructor(props) {
    super(props);
  }


  state = {
    startScreen: true,
    email: "",
    password: "",
    errorMessage: "",
    showSpinner: false,
    logoPos: new Animated.Value(Dimensions.get("window").height / 2 - 90),
    fadeOpacity: new Animated.Value(0),
    firstOpen: true
  }

  componentDidMount() {

    const animation1 = Animated.timing(this.state.logoPos, { toValue: 30, duration: 750 });
    const animation2 = Animated.timing(this.state.fadeOpacity, { toValue: 1, duration: 1500 });

    LoginService.onLoginStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("MainNav");
      } else {
        if (this.state.firstOpen) {
          setTimeout(() => Animated.parallel([animation1, animation2]).start(), 500);
          this.setState({ firstOpen: false });
        }
      }
    });
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
    let { fadeOpacity, logoPos } = this.state;
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <Spinner show={this.state.showSpinner} />
        <Animated.View style={styles.container}>
          <Animated.Image source={LogoImage}
            style={{
              height: 180,
              width: 220,
              position: "absolute",
              top: logoPos,
              // transform: [{ translateY: logoPos }],
              // top: logoPos
            }} />
          <Animated.View style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            width: "100%",
            opacity: fadeOpacity
          }} >
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
          </Animated.View>
        </Animated.View>
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
    paddingTop: 250, // for logo which is absolutely positioned
    height: "100%",
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
