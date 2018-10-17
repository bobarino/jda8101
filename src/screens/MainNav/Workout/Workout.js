import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import Button from "../../../components/Button";
import { Exercises } from "../../../entities";
import WorkoutStopwatch from "./WorkoutStopwatch";
import ExercisePreview from "./ExercisePreview";
import WorkoutRecord from "./WorkoutRecord";

import LoginService from "../../../services/LoginService";
import { Users } from "../../../entities";

export default class Workout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
      showFinish: false,
      workoutStart: null,
      workoutDuration: null,
      previewEx: null,
    };

    this.showPreviewModal = this.showPreviewModal.bind(this);
    this.finishWorkout = this.finishWorkout.bind(this);
    this.recordWorkout = this.recordWorkout.bind(this);
  }

  showPreviewModal(ex) {
    this.setState({ showPreview: true, previewEx: ex });
  }

  finishWorkout(start, duration) {
    this.setState({ showFinish: true, workoutStart: start, workoutDuration: duration });
  }

  recordWorkout(trimp, start, duration) {
    const docID = `${start.getFullYear()}/${start.getMonth()}/${start.getDate()}`;

    LoginService.getCurrentUser().then((user) => {
      user.logs.doc(docID).set({ duration, start, trimp });
    }).then(() => {
      // this is a bit hacky but it's how we change the button from the exit button back to
      // the hamburger menu button
      let parent = this.props.navigation.dangerouslyGetParent();
      while (parent) {
        if (parent.state.routeName === "Workout") {
          parent.setParams({ workoutActive: false });
          break;
        }
        parent = parent.dangerouslyGetParent();
      }
      this.props.navigation.navigate("HomeScreen");
    });
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
        <WorkoutStopwatch
          finishCallback={this.finishWorkout}
        />
        <ExercisePreview
          visible={this.state.showPreview}
          exercise={this.state.previewEx}
          closeCallback={() => this.setState({ showPreview: false, previewEx: null })}
        />
        <WorkoutRecord
          visible={this.state.showFinish}
          start={this.state.workoutStart}
          duration={this.state.workoutDuration}
          closeCallback={() => this.setState({ showFinish: false })}
          finishCallback={this.recordWorkout}
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
