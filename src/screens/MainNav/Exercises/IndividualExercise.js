import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";
import Button from "../../../components/Button";

import Ionicons from "react-native-vector-icons/Ionicons";


export default class IndividualExercise extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const exercise = this.props.navigation.state.params.exercise;

    return (
      <View style={{ width: "100%", height: "100%" }}>
        <View style={{ height: 50 }}>
          <View style={styles.header}>
            <Button style={styles.backButton} onPress={() => this.props.navigation.navigate("ExercisesList")}>
              <Ionicons name="md-arrow-round-back" size={35} color="#9599a2" />
            </Button>
            <Text style={styles.headerText}>{exercise.exName}</Text>
            <View style={{ width: 35 }} />
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#324151",
    height: 50
  },
  backButton: {
    paddingLeft: 10,
    width: 35,
    height: 35
  },
  headerText: {
    color: "white",
    fontSize: 16,
    textAlign: "center"
  }


});