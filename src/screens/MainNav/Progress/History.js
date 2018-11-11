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
    trimps: []
  }

  componentDidMount() {
    LoginService.getCurrentUser()
      .then((user) => Users.getSubCollectionList(user.id, "logs"))
      .then(async (logs) => {
        logs.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
        this.setState({ logs: logs });

      }).catch((error) => console.error(error));
  }

  render() {
    const { logs } = this.state;
    return (
      <ScrollView>
        <View>
          <Text style={{ fontSize: 20, padding: 5 }}>
            TRIMP History
          </Text>
          <TRIMPGraph width={Dimensions.get("window").width - 10} height={300} />
        </View>
        <Text style={{ fontSize: 20, marginTop: 10 }}> Exercise List: </Text>
        {logs.map((item, i) => {
          return (
            <View key={i} style={{ padding: 5 }}>
              <Text key={i} style={{ fontSize: 15, marginLeft: 20, fontWeight: "bold" }}>
                Date: {item.date.toString().split(" ")[1] + " " + item.date.toString().split(" ")[2] + " " + item.date.toString().split(" ")[3]}
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
