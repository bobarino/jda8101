import React, { Component } from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import Button from "../../../components/Button";
import { Exercises } from "../../../entities";

export default class WorkoutPreview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      stopwatchReset: false,
    };

    this.getFormattedTime = this.getFormattedTime.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  toggleStopwatch() {
    this.setState({ stopwatchStart: !this.state.stopwatchStart });
  }

  ex = (item, i) => {
    let unit, desc, type, wtType;
    if (item.unit === "Time") {
      unit = <Text style={styles.exerciseText}>{`Time: ${item.time} seconds`}</Text>;
    }
    if (item.unit === "Weight") {
      unit = <Text style={styles.exerciseText}>{`Reps: ${item.reps}`}</Text>;
    }
    if (item.description) {
      desc = <Text style={styles.exerciseText}>{`Description: ${item.description}`}</Text>;
    }
    if (item.type) {
      type = <Text style={styles.exerciseText}>{`Type: ${item.type}`}</Text>;
    }
    if (item.wtType) {
      wtType = <Text style={styles.exerciseText}>{`Weight Type: ${item.wtType}`}</Text>;
    }
    return (
      <Button key={i} style={styles.exerciseContiner} onPress={() => {
        Exercises.getByID(item.exid).then((ex) => this.props.navigation.navigate("ExercisePreview", { exercise: ex }));
      }}>
        <Text style={styles.exerciseName}>{`${i + 1} - ${item.exName}:`}</Text>
        <Text style={styles.exerciseText}>Sets: {item.sets}</Text>
        {unit}
        {type}
        {wtType}
        {desc}
      </Button>
    );
  }

  render() {
    const day = this.props.navigation.state.params.day;

    return (
      <ScrollView style={styles.scrollView}>
        {day.exercises.map((item, i) => this.ex(item, i))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    height: 100,
    alignSelf: "stretch"
  },
  exerciseContiner: {
    backgroundColor: "white",
    width: "100%",

    padding: 5,

    borderBottomWidth: 1,
    borderBottomColor: "grey"
  },
  exerciseName: {
    fontSize: 24,
    marginLeft: 20,
    fontWeight: "bold"
  },
  exerciseText: {
    fontSize: 16,
    marginLeft: 40,
  }
});
