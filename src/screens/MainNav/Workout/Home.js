import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import LoginService from "../../../services/LoginService";
import { Programs } from "../../../entities";
import Spinner from "../../../components/Spinner";
import Button from "../../../components/Button";
import { dayStrings, getWorkoutFromDates } from "../../../Utils";
import { ORANGE1 } from "../../../Colors";

export default class Home extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
  };

  state = {
    day: undefined,
    loading: true,
    completedWorkout: false
  }

  componentDidMount() {
    LoginService.getCurrentUser().then(async (user) => {
      const curDate = new Date();
      // const curDate = new Date("10/17/2018");
      const log = user.logs.doc(`${curDate.getFullYear()}/${curDate.getMonth()}/${curDate.getDate()}`).get();

      if (!user.curProgram) {
        this.setState({ completedWorkout: log.exists, loading: false });
      } else {
        const program = await user.curProgram.get();
        if (!program.exists) this.setState({ completedWorkout: log.exists, loading: false });
        else {
          const day = await getWorkoutFromDates(program.data(), user.curProgramStart, curDate);
          this.setState({ day, programStart: user.curProgramStart, loading: false });
        }
      }
    });
  }

  render() {

    const { day, loading } = this.state;

    if (loading) return (
      <View style={styles.baseContainer} >
        <Spinner show />
      </View >
    );

    if (!day || day.exercises.length == 0) return (
      <View style={styles.baseContainer} >
        <View style={styles.widgetContainer}>
          <Text style={styles.headerText}>No Workout Today</Text>
        </View>
      </View >
    );

    return (
      <View style={styles.baseContainer}>
        <View style={styles.widgetContainer}>
          <Text style={styles.headerText}>{dayStrings[day.day - 1]}{"'"}s Workout:</Text>
          <View style={{ marginLeft: 10, flexDirection: "row", width: "100%" }}>
            <Text style={{ fontSize: 24 }}>Week: </Text>
            <Text style={{ fontSize: 24 }}>{day.week}</Text>
          </View>
          <View style={{ marginLeft: 10, flexDirection: "row", width: "100%" }}>
            <Text style={{ fontSize: 24 }}>Training Cycle: </Text>
            <Text style={{ fontSize: 24 }}>{day.meso}</Text>
          </View>
          <Text style={{ marginLeft: 10, fontSize: 26 }}>Exercises: </Text>
          {day.exercises.map((item, i) => {
            return (
              <Text key={i} style={{ fontSize: 20, marginLeft: 30 }}>{item.exName}</Text>
            );
          })}
          <Button style={{ width: "100%", height: 32, marginTop: 20, alignItems: "center", backgroundColor: this.state.completedWorkout ? ORANGE1 : "green" }}
            onPress={() => {
              // this is a bit hacky but its how we change the button from the drawer to the exit button
              let parent = this.props.navigation.dangerouslyGetParent();
              while (parent) {
                if (parent.state.routeName === "Workout") {
                  parent.setParams({ workoutActive: true });
                  break;
                }
                parent = parent.dangerouslyGetParent();
              }

              this.props.navigation.navigate("LiveWorkout", { day: day });
              this.setState({ completedWorkout: true });
            }}
            disabled={this.state.completedWorkout}>
            <Text style={{ color: "white", fontSize: 24 }}>{this.state.completedWorkout ? "Workout Already Complete" : "Start Workout"}</Text>
          </Button>
        </View>
        <View style={styles.widgetContainer}>
          <Text>Widget 2</Text></View>
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
  widgetContainer: {
    backgroundColor: "white",
    width: "95%",

    padding: 5,

    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginTop: 10
  },
  headerText: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: "bold"
  }
});
