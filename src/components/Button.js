import React, { Component } from "react";
import { TouchableHighlight, View } from "react-native";

export default class Button extends Component {

  constructor(props) {
    super(props);
  }

  state = {};

  componentDidMount() {

  }

  render() {
    return (
      <TouchableHighlight
        style={this.props.style}
        onPress={this.props.onPress}
        activeOpacity={0.8}
      >
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
          {this.props.children}
        </View>
      </TouchableHighlight>
    );
  }
}