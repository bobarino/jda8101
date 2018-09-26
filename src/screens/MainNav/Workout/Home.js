import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import LoginService from "../../../services/LoginService";
import { Exercises } from "../../../entities";
import Spinner from "../../../components/Spinner";
import Button from "../../../components/Button";
import { getWorkoutDayAndWeek, dayStrings } from "../../../Utils";


export default class Home extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
  };

  state = {
    curUser: null,
    curDay: null,
    loading: true,
    noProgram: false,
    exList: null
  }

  componentDidMount() {
    // Exercises.getList().then((list) => {
    //   const columns = {};
    //   let index = 0;
    //   list.forEach((item) => {
    //     for (const key of Object.keys(item)) {
    //       if (!(key in columns))
    //         columns[key] = [];

    //       columns[key][index] = item[key];
    //     }
    //     index++;
    //   });

    //   let lines = [];
    //   for (let i = 0; i < index; i++) {
    //     lines.push(Object.keys(columns).map((key) => `"${columns[key][i]}"`).join(", "));
    //   }
    //   // console.log("columns:", columns);
    //   lines = lines.map((line) => line.replace("\n", "").replace("\t", ""));
    //   console.log(lines.join("\n"));
    // });

    LoginService.getCurrentUser().then((curUser) => {
      this.setState({ curUser });

      console.log("curUser:", curUser);

      if (curUser.curProgram) {
        // commented out for testing
        // const startDate = curUser.curProgramStart;
        // const curDate = new Date();
        // const startDate = new Date("09/03/2018");
        // const curDate = new Date("09/05/2018");

        // const { curDay, curWeek } = getWorkoutDayAndWeek(startDate, curDate);
        // curUser.curProgram.get()
        //   .then((doc) => doc.data())
        //   .then((program) => {
        //     console.log("program:", program);
        //     this.setState({ curDay: program.weeks[curWeek].days[curDay], loading: false });
        //   });
      } else {
        //
      }
    });
  }

  render() {
    const { curDay, loading } = this.state;

    if (loading) return (
      <View style={styles.baseContainer} >
        <Spinner show />
      </View >
    );

    if (curDay != {}) return (
      <View style={styles.baseContainer} >
        <Text style={styles.headerText}>No Workout Today</Text>
      </View >
    );

    return (
      <View style={styles.baseContainer} >
        <Text style={styles.headerText}>{dayStrings[curDay.day]}'s Workout:</Text>
        <View style={styles.exerciseContiner}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={{ fontSize: 26 }}>Week: </Text>
            <Text style={{ fontSize: 26 }}>{curDay.week}</Text>
          </View>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={{ fontSize: 26 }}>Training Cycle: </Text>
            <Text style={{ fontSize: 26 }}>{curDay.meso}</Text>
          </View>
          <Text style={{ fontSize: 26 }}>Exercises: </Text>
          {this.state.curDay.exercises.map((item, i) => {
            return (
              <Text key={i} style={{ fontSize: 20, marginLeft: 20 }}>{item.exName}</Text>
            );
          })}
          <Button style={{ width: "100%", height: 32, marginTop: 20, alignItems: "center", backgroundColor: "green" }}>
            <Text style={{ color: "white", fontSize: 24 }}>Start Workout</Text>
          </Button>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  exerciseContiner: {
    backgroundColor: "white",
    width: "100%",

    padding: 5,

    borderBottomWidth: 1,
    borderBottomColor: "grey"
  },
  headerText: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: "bold"
  }
});
