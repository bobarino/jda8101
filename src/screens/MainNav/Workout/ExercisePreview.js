import React, { Component } from "react";

import { Text, View, Modal, ScrollView, Dimensions, StyleSheet } from "react-native";
import Button from "../../../components/Button";

import Ionicons from "react-native-vector-icons/Ionicons";


export default class ExercisePreview extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    if (!this.props.exercise) return null;

    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}>

        {/* header container */}
        <View style={{ height: 70 }}>
          <View style={styles.header}>
            <Button style={styles.backButton} onPress={this.props.closeCallback}>
              <Ionicons name="md-arrow-round-back" size={35} color="#9599a2" />
            </Button>
            <Text style={styles.headerText}>{this.props.exercise.exName}</Text>
            <View style={{ width: 35 }} />
          </View>
        </View>

        {/* body container */}
        <ScrollView style={{ paddingTop: 20 }} contentContainerStyle={{ alignItems: "center" }}>
          <View style={styles.videoContainer} />
          <View style={{ flexDirection: "row", width: VIEW_WIDTH, marginTop: 20 }}>
            <Text style={styles.labelText}>Type:</Text>
            <Text style={styles.typeText}>{this.props.exercise.exType}</Text>
          </View>
          <View style={{ flexDirection: "row", width: VIEW_WIDTH, marginTop: 20 }}>
            <Text style={styles.labelText}>Start:</Text>
            <Text style={styles.typeText}>{this.props.exercise.exStart}</Text>
          </View>
          <View style={{ flexDirection: "row", width: VIEW_WIDTH, marginTop: 20 }}>
            <Text style={styles.labelText}>Action:</Text>
            <Text style={styles.typeText}>{this.props.exercise.exAct}</Text>
          </View>
        </ScrollView>
      </Modal>
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
    height: 50,
    paddingTop: 20
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