import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";

import { Users } from "../../entities";
import LoginService from "../../services/LoginService";

import RosterListView from "./TeamRoster/RosterListView";

import Spinner from "../../components/Spinner"

class TeamRoster extends Component {

  team = "";
  users = [];
  state = { loading: true };

  componentDidMount() {

    LoginService.getCurrentUser().then((list) => {this.team = list.team._documentPath._parts[1]; });

    Users.getList().then((list) => {list.forEach((x) => {
          if (x.team && x.team._documentPath && x.team._documentPath._parts[1] == this.team && x.type != "coach") {
            this.users.push(x);
          }
        } 
      );
      this.setState({ loading: false });
    });
  }

  static navigationOptions = {
    drawerLabel: "TeamRoster",
  };

  render() {
    if (this.state.loading)
      return (
        <View style={styles.spinnerContainer} >
          <Spinner show />
        </View >
      );

    return (
      <View>
        <RosterListView players={this.users} />
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

const styles = StyleSheet.create({
  spinnerContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%"
  }
});