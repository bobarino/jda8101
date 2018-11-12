import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Users } from "../../../entities";
import { LineChart } from "react-native-chart-kit";
import LoginService from "../../../services/LoginService";
import TRIMPGraph from "./TRIMPGraph";


export default class History extends Component {

  state = {
    logs: [],
    dates: [],
    trimps: [],
    name: null,
  }

  componentDidMount() {
    console.log("this.props.navigation.state:", this.props.navigation.state);
    if (this.props.navigation.state.params && this.props.navigation.state.params.user) {
      this.setState({
        name: this.props.navigation.state.params.user.name,
        userID: this.props.navigation.state.params.user.id
      });
      Users.getSubCollectionList(this.props.navigation.state.params.user.id, "logs")
        .then(async (logs) => {
          logs = await logs;
          console.log("userID(1):", this.props.navigation.state.params.user.id);
          logs.sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));
          this.setState({ logs: logs, userID: this.props.navigation.params.user.id });
        }).catch((error) => console.error(error));
    } else {
      LoginService.getCurrentUser()
        .then((user) => ({ userID: user.id, logs: Users.getSubCollectionList(user.id, "logs") }))
        .then(async ({ userID, logs }) => {
          logs = await logs;
          console.log("userID(2):", userID);
          logs.sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));
          this.setState({ logs, userID });
        }).catch((error) => console.error(error));
    }
  }

  render() {
    const { logs } = this.state;
    return (
      <View style={{ width: "100%", alignItems: "center", flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20, paddingTop: 5 }}>
            TRIMP History{this.state.name != null ? " for " + this.state.name : ""}
          </Text>
          <TRIMPGraph width={Dimensions.get("window").width - 10} height={300} userid={this.state.userID} />
        </View>
        <Text style={{ alignSelf: "flex-start", fontSize: 20, marginTop: 10, marginLeft: 5 }}>Workouts Performed: </Text>
        <View style={{ backgroundColor: "white", width: "100%", flexGrow: 1 }}>
          <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
            {logs.map((item, i) => {
              return (
                <View key={i} style={{ width: "100%", padding: 5, borderTopWidth: 1, borderTopColor: "black" }}>
                  <Text key={i} style={{ fontSize: 15, marginLeft: 20, fontWeight: "bold" }}>
                    Date: {item.start.toString().split(" ")[1] + " " + item.start.toString().split(" ")[2] + " " + item.start.toString().split(" ")[3]}
                  </Text>
                  <Text style={{ fontSize: 15, marginLeft: 20 }}>
                    Duration: {item.duration.toString()}
                  </Text>
                  <Text style={{ fontSize: 15, marginLeft: 20 }}>
                    TRIMP Score: {item.trimp.toString()}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
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
