import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import LoginService from "../../services/LoginService";


export default class Login extends Component {
  state = { email: "", password: "", errorMessage: "" }

  handleLogin() {
    const { email, password } = this.state;
    LoginService.login(email, password)
      .then(() => this.props.navigation.navigate("DrawNav"))
      .catch((error) => { console.log("login error:", JSON.stringify(error)); this.setState({ errorMessage: `Error: ${error.userInfo.NSLocalizedDescription}` }); });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Text style={{ color: "red" }}>
          {this.state.errorMessage}
        </Text>
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
        <Button title="Log In" onPress={this.handleLogin.bind(this)} />
        <Button
          title="Don't have an account? Register"
          onPress={() => this.props.navigation.navigate("Register")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
});
