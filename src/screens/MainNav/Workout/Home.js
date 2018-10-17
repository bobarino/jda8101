import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import LoginService from "../../../services/LoginService";
import { Programs } from "../../../entities";
import Spinner from "../../../components/Spinner";
import Button from "../../../components/Button";
import { dayStrings } from "../../../Utils";
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
    const curWeek = 1;
    const curDay = 2;

    Programs.getList().then(async (programs) => {
      const curProgram = programs[0];

      const week = curProgram.weeks[curWeek];
      let day = undefined;
      if (week) {
        day = week.days[curDay];
      }

      if (day) {
        day.get().then((doc) => {
          this.setState({ day: doc.data(), loading: false });
        });
      } else {
        this.setState({ loading: false });
      }

    }).catch((error) => console.error(error));

    // Exercises.getList().then((list) => this.setState({ exers: list }));

    this.setState({ curUser: LoginService.getCurrentUser() });
  }

  render() {

    const { day, loading } = this.state;

    if (loading) return (
      <View style={styles.baseContainer} >
        <Spinner show />
      </View >
    );


    if (day.exercises.length == 0) return (
      <View style={styles.baseContainer} >
        <Text style={styles.headerText}>No Workout Today</Text>
      </View >
    );

    return (
      <View style={styles.baseContainer}>
        <Text style={styles.headerText}>{dayStrings[day.day]}{"'"}s Workout:</Text>
        <View style={styles.exerciseContiner}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={{ fontSize: 26 }}>Week: </Text>
            <Text style={{ fontSize: 26 }}>{day.week}</Text>
          </View>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={{ fontSize: 26 }}>Mesocycle: </Text>
            <Text style={{ fontSize: 26 }}>{day.meso}</Text>
          </View>
          <Text style={{ fontSize: 26 }}>Exercises: </Text>
          {day.exercises.map((item, i) => {
            return (
              <Text key={i} style={{ fontSize: 20, marginLeft: 20 }}>{item.exName}</Text>
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
