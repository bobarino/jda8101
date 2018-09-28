import React, { Component } from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";

import UserForm from "./Profile/UserForm";

class Profile extends Component {
  static navigationOptions = {
    drawerLabel: "Profile",
  };

  render() {
    return (
      <View>
        <UserForm email="johnjones@gmail.com" displayName="John Jones" teams={[]} />
      </View>
    );
  }
}

export default function ProfileScreen(navigationOptionsFunc) {
  return createStackNavigator(
    { Profile: { screen: Profile } },
    { navigationOptions: navigationOptionsFunc },
  );
}
