import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";
import Button from "../../../components/Button";
import { ORANGE1 } from "../../../Colors";

const bgColor = "#324151";

const timerOptions = {
  container: {
    backgroundColor: "white",
    padding: 5,
    margin: 5,
    borderRadius: 5,
    width: 250,
    alignItems: "center"
  },
  text: {
    fontSize: 30,
    color: "black",
    marginLeft: 7,
  }
};

export default class WorkoutStopwatch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stopwatchStart: false,
      stopwatchReset: false,
    };

    this.getFormattedTime = this.getFormattedTime.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.finishWorkout = this.finishWorkout.bind(this);
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  toggleStopwatch() {
    this.setState({ stopwatchStart: !this.state.stopwatchStart });
  }

  finishWorkout() {
    this.props.navigation.navigate("HomeScreen");
  }

  render() {
    return (
      <View style={styles.bottomBar}>
        <Button style={this.state.stopwatchStart ? styles.pauseButton : styles.startButton} onPress={this.toggleStopwatch}>
          <Text>{this.state.stopwatchStart ? "Pause" : "Start"}</Text>
        </Button>
        <Stopwatch start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={timerOptions}
          getTime={this.getFormattedTime} />
        <Button style={styles.stopButton} onPress={this.finishWorkout}>
          <Text>Finish</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomBar: {
    width: "100%",
    height: 60,
    backgroundColor: bgColor,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  startButton: {
    width: 50,
    height: 50,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  pauseButton: {
    width: 50,
    height: 50,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  stopButton: {
    width: 50,
    height: 50,
    backgroundColor: ORANGE1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginTop: 5,
    borderRadius: 5,
  },
});

