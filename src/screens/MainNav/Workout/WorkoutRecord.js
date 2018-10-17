import React, { Component } from "react";
import { Text, View, Modal, Alert, Dimensions, StyleSheet } from "react-native";
import Button from "../../../components/Button";
import Ionicons from "react-native-vector-icons/Ionicons";

import { ORANGE1 } from "../../../Colors";


export default class WorkoutPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTrimp: null
    };
  }


  render() {
    const scoreButtons = [];

    for (let i = 1; i <= 10; i++) {
      scoreButtons.push(
        <Button key={i}
          style={this.state.selectedTrimp === i ? styles.trimpButtonSelected : styles.trimpButtonUnselected}
          onPress={() => this.setState({ selectedTrimp: i })}
        >
          <Text style={styles.trimpButtonText}>{i}</Text>
        </Button>
      );
    }

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
            <Text style={styles.headerText}>Finish Workout</Text>
            <View style={{ width: 35 }} />
          </View>
        </View>

        {/* body container */}
        <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.titleText}>Great Workout!</Text>
            <Text style={styles.bodyText}>Your Time was:</Text>
            <Text style={styles.durationText}>{this.props.duration}</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.bodyText}>Please select a TRIMP Score to record.</Text>
            <View style={styles.trimpButtonContainer}>{scoreButtons}</View>}
          </View>
          <Button style={styles.submitButton}
            onPress={() => {
              if (this.state.selectedTrimp === null)
                Alert.alert("Error", "Please select a TRIMP score to continue.");
              else
                this.props.finishCallback(this.state.selectedTrimp, this.props.start, this.props.duration);
            }}
          >
            <Text style={{ color: "white" }}>Submit</Text>
          </Button>
        </View>
      </Modal >
    );
  }
}

const VIEW_WIDTH = Dimensions.get("window").width;

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
  submitButton: {
    width: VIEW_WIDTH - 10,
    height: 50,
    marginBottom: 10,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 48,
    fontWeight: "bold"
  },
  bodyText: {
    fontSize: 24,
  },
  durationText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  trimpButtonContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 3,
    paddingRight: 3,
  },

  trimpButtonUnselected: {
    width: (VIEW_WIDTH * 0.2 - 6) - 6,
    height: (VIEW_WIDTH * 0.2 - 6) - 6,
    margin: 3,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  trimpButtonSelected: {
    width: (VIEW_WIDTH * 0.2 - 6) - 6,
    height: (VIEW_WIDTH * 0.2 - 6) - 6,
    margin: 3,
    backgroundColor: ORANGE1,
    justifyContent: "center",
    alignItems: "center",
  },
  trimpButtonText: {
    color: "white",
    fontSize: 16
  }
});