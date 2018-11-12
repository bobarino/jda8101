import React, { Component } from "react";
import { Text, View, StyleSheet, } from "react-native";
import { dayStrings } from "../../../Utils";
import Button from "../../../components/Button";

export default class PreviewWorkout extends Component {

  render() {

    const { day } = this.props.navigation.state.params;

    return (
      <View style={styles.baseContainer}>
        <View style={styles.widgetContainer}>
          <Text style={styles.headerText}>{day.sport} Level {day.level} {day.meso} Workout #{day.day}:</Text>
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
          <Button style={{ width: "100%", height: 32, marginTop: 20, alignItems: "center", backgroundColor: "green" }}
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
            }}>
            <Text style={{ color: "white", fontSize: 24 }}>Start Workout</Text>
          </Button >
        </View >
      </View>
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
