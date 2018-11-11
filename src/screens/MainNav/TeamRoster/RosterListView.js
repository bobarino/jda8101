import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

const getInitials = name => {
  if (!name.length) return "AP";

  const arr = name.split(" ");
  if (arr.length > 1) return `${arr[0][0].toUpperCase()}${arr[1][0].toUpperCase()}`;
  return arr[0].toUpperCase();
};

class ListItem extends Component {
  render() {
    const { name, workoutsCompleted } = this.props;
    return (
      <View>
        <View style={styles.line} />
        <View style={styles.outerContainer}>
          <Avatar
            activeOpacity={0.7}
            medium
            title={getInitials(name || "")}
          />
          <View style={styles.innerContainer}>
            <Text style={styles.name}>{name}</Text>;
            <Text style={styles.workoutsCompleted}>{workoutsCompleted}</Text>
          </View>
        </View>
      </View>
    );
  }
}

class RosterListView extends Component {
  render() {
    const { players } = this.props;
    return (
      <View style={{ height: "100%" }}>
        <View style={styles.titleContainer}>
          <View style={{ marginLeft: 48 }}><Text style={{ fontWeight: "bold" }}>Name</Text></View>
          <View><Text style={{ fontWeight: "bold" }}>Workouts Completed</Text></View>
        </View>
        <FlatList
          data={players.map(player => ({ key: player.id, ...player }))}
          renderItem={({ item }) => <ListItem {...item} />}
          style={{ flexGrow: 1 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  line: {
    borderBottomColor: "#A9A9A9",
    borderBottomWidth: 1,
  },
  outerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    width: 295,
    marginLeft: 5,
  },
  workoutsCompleted: {
    fontSize: 18,
  }
});

export default RosterListView;
