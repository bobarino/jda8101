import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, TextInput, Keyboard } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Button from "../../../components/Button";
import { Workouts } from "../../../entities";

export default class SelectWorkout extends Component {
  constructor(props) {
    super(props);

    Workouts.getList().then((list) => this.setState({ workouts: list, loading: false }));

    this.state = {
      workouts: [],
      loading: true,
    };
  }


  render() {
    const list = this.state.workouts;

    const exList = list.map((x, i) => {
      return (
        <View key={i}>
          <Button
            style={styles.listCell}
            onPress={() => this.props.navigation.navigate("PreviewWorkout", { day: x })}>
            <Text style={styles.listCellText}>{x.sport} Level {x.level} - {x.season} {x.meso} #{x.day}</Text>
          </Button>
        </View>
      );
    });

    return (
      <View>
        <View style={{ height: 50 }}>
          <View style={styles.header}>
            <Button style={styles.backButton} onPress={() => undefined}>
              <Ionicons style={styles.searchButton} name="md-search" size={32} color="#9599a2" />
            </Button>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                autoCapitalize="none"
                placeholder="Search"
                onChangeText={val => this.setState({ search: val })}
                value={this.state.search}
              />
            </View>
          </View>
        </View>

        {/* Hide the keyboard when we scroll so the user can dismiss the keyboard */}
        <ScrollView style={{ backgroundColor: "#9599a2" }}
          onScrollBeginDrag={() => Keyboard.dismiss()}>
          {exList}
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "stretch",
    backgroundColor: "#324151",
    height: 50
  },
  searchButton: {
    paddingRight: 10,
    width: 32,
    height: 32
  },
  searchInput: {
    borderRadius: 20,
    height: 40,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
  },
  searchInputContainer: {
    flex: 1,
  },
  listCell: {
    height: 50,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "grey"
  },
  listCellText: {
    paddingLeft: 20,
    fontWeight: "600"
  }
});