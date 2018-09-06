import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import LoginService from "../../services/LoginService";


export default class Register extends Component {
  state = { email: "", password: "", team: "", errorMessage: "" }

  handleSignUp = () => {
<<<<<<< HEAD
    LoginService.register(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('DrawNav'))
=======
    LoginService.signUp(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("DrawNav"))
>>>>>>> Replace all single quotes with double quotes and correctly display error from firebase on Logging In
      .catch(error => this.setState({ errorMessage: error.message }));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Register</Text>
        {this.state.errorMessage &&
          <Text style={{ color: "red" }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
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
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate("Login")}
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
