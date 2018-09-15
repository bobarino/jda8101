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
      this.setState({ program: programs[1], curDay, curWeek, loading: false });
    }).catch((error) => console.error(error));
  }

  render() {
    const num = 5;
    let i = 0;
    const workouts = [];

    if (this.state.loading) {
      return null;
    }

    const { program } = this.state;
    let { curDay, curWeek } = this.state;

    while (i < num) {
      const day = program.weeks[curWeek].days[curDay];
      if (day && day.hasOwnProperty("wID")) {
        workouts.push(day);
        i++;
      }

      curDay++;
      if (curDay == 7) {
        curDay = 0;
        curWeek++;
      }
    }

    console.log("workouts:", workouts);

    // return (
    //   <View style={styles.baseContainer}>
    //     {workouts.map((item, i) => {
    //       return (
    //         <View key={i}>
    //           <Text style={styles.headerText}>{dayStrings[item.day]} Workout:</Text>
    //         </View>
    //       );
    //     })}
    //   </View>
    // );

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
