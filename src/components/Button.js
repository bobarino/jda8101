import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";

export default class Button extends Component {

  constructor(props) {
    super(props);
  }

  state = {};

  componentDidMount() {

  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        activeOpacity={0.8}
      >
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
}