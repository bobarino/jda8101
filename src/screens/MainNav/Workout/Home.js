import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import LoginService from "../../../services/LoginService";
import Programs from "../../../entities/Programs";
import Spinner from "../../../components/Spinner";
import { getWorkoutDayAndWeek, dayStrings } from "../../../Utils";


export default class Home extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
  };

  state = {
    curUser: null,
    curDay: null,
    loading: true
  }

  componentDidMount() {
    const startDate = new Date("09/03/2018");
    // const curDate = new Date();
    const curDate = new Date("09/05/2018");
    const { curDay, curWeek } = getWorkoutDayAndWeek(startDate, curDate);

    Programs.getList().then((programs) => {
      const curProgram = programs[1];
      const day = curProgram.weeks[curWeek].days[curDay];
      this.setState({ curDay: day, loading: false });
    }).catch((error) => console.error(error));

    this.setState({ curUser: LoginService.getCurrentUser() });
  }

  render() {
    const { curDay, loading } = this.state;

    if (loading) return (
      <View style={styles.baseContainer} >
        <Spinner show />
      </View >
    );

    if (!curDay) return (
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
            <Text style={{ fontSize: 26 }}>Mesocycle: </Text>
            <Text style={{ fontSize: 26 }}>{curDay.meso}</Text>
          </View>
          <Text style={{ fontSize: 26 }}>Exercises: </Text>
          {this.state.curDay.exercises.map((item, i) => {
            return (
              <Text key={i} style={{ fontSize: 20, marginLeft: 20 }}>{item.exName}</Text>
            );
          })}
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
