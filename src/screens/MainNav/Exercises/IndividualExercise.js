import React, { Component } from "react";

import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import Button from "../../../components/Button";

import Ionicons from "react-native-vector-icons/Ionicons";


export default class IndividualExercise extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { exercise } = this.props.navigation.state.params;

    return (
      <View style={{ width: "100%", height: "100%" }}>
        {/* header container */}
        <View style={{ height: 50 }}>
          <View style={styles.header}>
            <Button style={styles.backButton} onPress={() => this.props.navigation.navigate("ExercisesList")}>
              <Ionicons name="md-arrow-round-back" size={35} color="#9599a2" />
            </Button>
            <Text style={styles.headerText}>{exercise.exName}</Text>
            <View style={{ width: 35 }} />
          </View>
        </View>

        {/* body container */}
        <ScrollView style={{ paddingTop: 20 }} contentContainerStyle={{ alignItems: "center" }}>
          <View style={styles.videoContainer} />
          <View style={{ flexDirection: "row", width: VIEW_WIDTH, marginTop: 20 }}>
            <Text style={styles.labelText}>Type:</Text>
            <Text style={styles.typeText}>{exercise.exType}</Text>
          </View>
          <View style={{ flexDirection: "row", width: VIEW_WIDTH, marginTop: 20 }}>
            <Text style={styles.labelText}>Start:</Text>
            <Text style={styles.typeText}>{exercise.exStart}</Text>
          </View>
          <View style={{ flexDirection: "row", width: VIEW_WIDTH, marginTop: 20 }}>
            <Text style={styles.labelText}>Action:</Text>
            <Text style={styles.typeText}>{exercise.exAct}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const VIEW_WIDTH = Dimensions.get("window").width - 40;

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
  },
  videoContainer: {
    width: VIEW_WIDTH,
    borderWidth: 1,
    borderColor: "grey",
    height: VIEW_WIDTH,
    justifyContent: "center",
    alignItems: "center"
  },
  labelText: {
    fontSize: 24,
    fontWeight: "800",
    marginRight: 20,
    width: 85
  },
  typeText: {
    fontSize: 24,
    width: VIEW_WIDTH - 105
  }


});