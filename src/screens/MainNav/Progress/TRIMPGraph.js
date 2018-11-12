import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Users } from "../../../entities";
import { LineChart } from "react-native-chart-kit";
import LoginService from "../../../services/LoginService";
import Spinner from "../../../components/Spinner";


export default class TRIMPGraph extends Component {
  state = {
    dates: [],
    trimps: [],
    userid: null,
  }

  componentDidMount() {
    if (this.props.userid !== this.state.userid) this.update();
  }

  componentDidUpdate() {
    if (this.props.userid !== this.state.userid) this.update();
  }

  update() {
    if (this.props.userid) {
      Users.getSubCollectionList(this.props.userid, "logs")
        .then(async (logs) => {
          logs.sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));
          let dates = [];
          let trimps = [];
          for (var i = 0; i < logs.length; i++) {
            dates.push(logs[i].start.getMonth() + "/" + logs[i].start.getDate());
            trimps.push(logs[i].trimp);
          }
          this.setState({ dates, trimps, loaded: true, userid: this.props.userid });

        }).catch((error) => console.error(error));
    }
  }

  render() {
    if (this.state.loaded) {
      if (this.state.dates.length == 0) {
        return (
          <View style={{ width: this.props.width, height: this.props.height, backgroundColor: "white" }} />
        );
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