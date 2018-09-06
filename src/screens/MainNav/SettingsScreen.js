import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";

class Settings extends Component {

  static navigationOptions = {
    drawerLabel: "Settings",
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
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

export default function SettingsScreen(navigationOptionsFunc) {
  return createStackNavigator(
    { Settings: { screen: Settings } }, { navigationOptions: navigationOptionsFunc }
  );
}
