import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Users } from "../../../entities";
import { Firestore } from "../../../entities/Firestore";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'


export default class History extends Component {

  state = {
    logs: [],
    dates: [],
    trimps: []
  }

  componentDidMount() {
    //TODO- Need to get current correct user dynamically
    Users.getSubCollectionList("test@athlete-physics.com", "logs").then(async (logs) => {
      logs.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
      this.setState({ logs: logs });
      let dates = [];
      let trimps = [];
      for (var i = 0; i < logs.length; i++) {
        dates.push(logs[i].date.toString().split(" ")[1] + " " + logs[i].date.toString().split(" ")[2]);
        trimps.push(logs[i].trimp);
      }
      this.setState({ dates: dates });
      this.setState({ trimps: trimps });

    }).catch((error) => console.error(error));
  }

  render() {
    const { logs, dates, trimps} = this.state;
    console.log("Logging Dates New: ", dates);
    console.log("Logging Trimps HEYY: ", trimps);
    if (dates.length > 0 && trimps.length > 0)
      return (
        <View>
          <Text style={{ fontSize: 26, padding: 15 }}>
            TRIMP History
          </Text>
          <LineChart
            data={{
              labels: dates,
              datasets: [{
                data: trimps
              }]
            }}
            width={Dimensions.get('window').width}
            height={350}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      );
    return (
      <View>
        <Text>
          TRIMP History
        </Text>
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
