import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Users } from "../../../entities";
import { LineChart } from "react-native-chart-kit";
import LoginService from "../../../services/LoginService";


export default class History extends Component {

  state = {
    logs: [],
    dates: [],
    trimps: []
  }

  componentDidMount() {
    //TODO- Need to get current correct user dynamically

    LoginService.getCurrentUser()
      .then((user) => Users.getSubCollectionList(user.id, "logs"))
      .then(async (logs) => {
        logs.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
        this.setState({ logs: logs });
        let dates = [];
        let trimps = [];
        for (var i = 0; i < logs.length; i++) {
          dates.push(logs[i].date.toString().split(" ")[1] + " " + logs[i].date.toString().split(" ")[2] + " " + logs[i].date.toString().split(" ")[3]);
          trimps.push(logs[i].trimp);
        }
        this.setState({ dates: dates });
        this.setState({ trimps: trimps });

      }).catch((error) => console.error(error));
  }

  render() {
    const { logs, dates, trimps } = this.state;
    if (dates.length > 0 && trimps.length > 0)
      return (
        <ScrollView>
          <View>
            <Text style={{ fontSize: 20, padding: 5 }}>
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
              height={300}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
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
    return (
      <View>
        <Text>
          History Not Found
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
