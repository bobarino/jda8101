import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";

class Profile extends Component {
  static navigationOptions = {
    drawerLabel: "Profile",
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
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

export default function ProfileScreen(navigationOptionsFunc) {
  return createStackNavigator(
    { Profile: { screen: Profile } }, { navigationOptions: navigationOptionsFunc }
  );
}
