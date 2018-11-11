import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Users } from "../../../entities";
import { LineChart } from "react-native-chart-kit";
import LoginService from "../../../services/LoginService";
import Spinner from "../../../components/Spinner";


export default class TRIMPGraph extends Component {
  state = {
    dates: [],
    trimps: []
  }

  componentDidMount() {
    LoginService.getCurrentUser()
      .then((user) => Users.getSubCollectionList(user.id, "logs"))
      .then(async (logs) => {
        logs.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
        let dates = [];
        let trimps = [];
        for (var i = 0; i < logs.length; i++) {
          dates.push(logs[i].start.getMonth() + "/" + logs[i].start.getDate());
          trimps.push(logs[i].trimp);
        }
        this.setState({ dates, trimps, loaded: true });

      }).catch((error) => console.error(error));
  }

  render() {
    if (this.state.loaded) {
      if (this.state.dates.length == 0) {
        return null;
      }

      return (
        <LineChart
          data={{
            labels: this.state.dates,
            datasets: [{
              data: this.state.trimps
            }]
          }}
          width={this.props.width}
          height={this.props.height}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            alignSelf: "center"
          }}
        />
      );
    }
    return (
      <View style={{ width: this.props.width, height: this.props.height }}>
        <Spinner show={true} />
      </View>
    );

  }
}