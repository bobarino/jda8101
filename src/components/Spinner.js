import React, { Component } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";

import { ORANGE1 } from "../Colors";

export default class Spinner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.show ? (
      <View style={styles.overlay}>
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color={ORANGE1} animating={this.props.show} />
        </View>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  }
});