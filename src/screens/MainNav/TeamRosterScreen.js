import React, { Component } from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";

import RosterListView from "./TeamRoster/RosterListView";

const players = [
  { id: "1", name: "John Jones", workoutsCompleted: 5 },
  { id: "2", name: "Arthur Curry", workoutsCompleted: 2 },
  { id: "3", name: "Barry Allen", workoutsCompleted: 18 },
  { id: "4", name: "Diana Prince", workoutsCompleted: 8 },
];

class TeamRoster extends Component {
  static navigationOptions = {
    drawerLabel: "TeamRoster",
  };

  render() {
    return (
      <View>
        <RosterListView players={players} />
      </View>
    );
  }
}

export default function TeamRosterScreen(navigationOptionsFunc) {
  return createStackNavigator(
    { TeamRoster: { screen: TeamRoster } },
    { navigationOptions: navigationOptionsFunc },
  );
}
