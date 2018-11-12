import React, { Component } from "react";
import { View } from "react-native";
import { createStackNavigator } from "react-navigation";

import RosterListView from "./TeamRoster/RosterListView";
import { Teams } from "../../entities";

class TeamRoster extends Component {
  static navigationOptions = {
    drawerLabel: "TeamRoster",
  };

  state = {
    players: [
      // { id: "1", name: "John Jones", workoutsCompleted: 5, userObj: null },
      // { id: "2", name: "Arthur Curry", workoutsCompleted: 2, userObj: null },
      // { id: "3", name: "Barry Allen", workoutsCompleted: 18, userObj: null },
      // { id: "4", name: "Diana Prince", workoutsCompleted: 8, userObj: null },
    ]
  };

  componentDidMount() {
    Teams.getByID("11102").then((team) => {
      for (const userRef of team.users) {
        userRef.get().then((userSnapshot) => {
          if (userSnapshot.exists) {
            const user = userSnapshot.data();
            const numWorkouts = 5;
            const prevPlayers = this.state.players;
            prevPlayers.push({ id: user.id, name: user.first + " " + user.last, workoutsCompleted: numWorkouts, userObj: user });
            this.setState({ players: prevPlayers });
          }
        });
      }
    });
  }

  render() {
    return (
      <View>
        <RosterListView players={this.state.players} navigation={this.props.navigation} />
      </View >
    );
  }
}

export default function TeamRosterScreen(navigationOptionsFunc) {
  return createStackNavigator(
    { TeamRoster: { screen: TeamRoster } },
    { navigationOptions: navigationOptionsFunc },
  );
}
