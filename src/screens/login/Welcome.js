import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import LoginService from "../../services/LoginService";


export default class Welcome extends Component {

  componentDidMount() {
    LoginService.onLoginStateChanged(user => {
      this.props.navigation.navigate(user ? "DrawNav" : "Welcome");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome</Text>
        <Button title="Log in"
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Button title="Register"
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
    alignItems: "center",
  }
});
