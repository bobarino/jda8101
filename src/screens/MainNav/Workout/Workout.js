import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import Button from "../../../components/Button";
import { Exercises } from "../../../entities";
import WorkoutStopwatch from "./WorkoutStopwatch";
import ExercisePreview from "./ExercisePreview";

export default class Workout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      stopwatchReset: false,
      showPreview: false,
      previewEx: null,
    };

    this.getFormattedTime = this.getFormattedTime.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.showPreviewModal = this.showPreviewModal.bind(this);
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  toggleStopwatch() {
    this.setState({ stopwatchStart: !this.state.stopwatchStart });
  }

  showPreviewModal(ex) {
    this.setState({ showPreview: true, previewEx: ex });
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
        Exercises.getByID(item.exid).then((ex) => this.showPreviewModal(ex));
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
      <View>
        <WorkoutStopwatch />
        <ExercisePreview
          visible={this.state.showPreview}
          exercise={this.state.previewEx}
          closeCallback={() => this.setState({ showPreview: false, previewEx: null })}
        />
        <ScrollView style={styles.scrollView}>
          {day.exercises.map((item, i) => this.ex(item, i))}
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
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
