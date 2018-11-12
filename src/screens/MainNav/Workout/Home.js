import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import LoginService from "../../../services/LoginService";
import { Users } from "../../../entities";
import Spinner from "../../../components/Spinner";
import Button from "../../../components/Button";
import { dayStrings, getWorkoutFromDates } from "../../../Utils";
import { ORANGE1 } from "../../../Colors";
import TRIMPGraph from "../Progress/TRIMPGraph";

export default class Home extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
  };

  state = {
    day: undefined,
    loading: true,
    completedWorkout: false,
    user: null
  }

  componentDidMount() {
    LoginService.getCurrentUser().then((user) => {
      const curDate = new Date();
      let logExists = false;

      user.logs.get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          if (doc.data().start.getMonth() == curDate.getMonth()
            && doc.data().start.getYear() == curDate.getYear()
            && doc.data().start.getDate() == curDate.getDate()) {
            logExists = true;
          }
        });
      }).then(async () => {
        if (!user.curProgram) {
          this.setState({ completedWorkout: logExists, loading: false, user });
        } else {
          const program = await user.curProgram.get();
          if (!program.exists) this.setState({ completedWorkout: logExists, loading: false, user });
          else {
            const day = await getWorkoutFromDates(program.data(), user.curProgramStart, curDate);
            this.setState({ day, programStart: user.curProgramStart, loading: false, user });
          }
        }
      }).catch((e) => console.log("error:", e));
    }).catch((e) => console.log("error:", e));
  }

  render() {

    const { day, loading } = this.state;

    if (loading) return (
      <View style={styles.baseContainer} >
        <Spinner show />
      </View >
    );

    let workoutElement = (
      <View style={styles.widgetContainer}>
        <Text style={styles.headerText}>No Workout Today</Text>
      </View>
    );

    if (day && day.exercises.length != 0) workoutElement = (
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
        {
          day.exercises.map((item, i) => {
            return (
              <Text key={i} style={{ fontSize: 20, marginLeft: 30 }}>{item.exName}</Text>
            );
          })
        }
        <Button style={{ width: "100%", height: 32, marginTop: 20, alignItems: "center", backgroundColor: this.state.completedWorkout ? "grey" : "green" }}
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
    );

    return (
      <View style={styles.baseContainer}>
        <ScrollView contentContainerStyle={{ alignItems: "center", width: "100%" }}>
          {workoutElement}
          <View style={styles.widgetContainer}>
            <Text style={styles.graphHeader}>TRIMP Score History</Text>
            <TRIMPGraph width={Dimensions.get("window").width - 40} height={200} userid={this.state.user.id} />
          </View>
          <View style={styles.widgetContainer}>
            <Text>Perform Any Workout</Text>
            <Button style={{ width: "100%", height: 32, marginTop: 20, alignItems: "center", backgroundColor: "green" }}
              onPress={() => this.props.navigation.navigate("SelectWorkout")}>
              <Text style={{ color: "white", fontSize: 24 }}>Select Workout</Text>
            </Button>
          </View>
        </ScrollView >
      </View >
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    width: "100%",
    flex: 1,
  },
  widgetContainer: {
    backgroundColor: "white",
    width: "95%",

    padding: 5,

    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginTop: 10,
    alignItems: "flex-start"
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold"
  },
  graphHeader: {
    fontSize: 18,
    alignSelf: "center"
  }
});
