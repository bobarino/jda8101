import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Programs } from "../../../entities";
import { getWorkoutDayAndWeek, dayStrings } from "../../../Utils";

export default class Program
  extends Component {

  startDate = new Date("09/03/2018");
  curDate = new Date("09/05/2018");

  state = { program: undefined, curDay: 0, curWeek: 0, loading: true };

  componentDidMount() {
    // const curDate = new Date();

    const { curDay, curWeek } = getWorkoutDayAndWeek(this.startDate, this.curDate);

    Programs.getList().then((programs) => {
      const program = programs[0];
      this.setState({ program, curDay, curWeek, loading: false });
    }).catch((error) => console.error(error));
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text>Program</Text>
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
