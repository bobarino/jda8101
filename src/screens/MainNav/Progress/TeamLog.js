import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Teams } from "../../../entities";


export default class TeamLog extends Component {

  state = {
    curUser: undefined,
    school: undefined,
    curTeam: undefined,
    students: [],
    type: "coach"
  }

  componentDidMount() {
    Teams.getList().then(async (teams) => {
      //TODO- Need to get current Team dynamically based off current user
      const curTeam = teams[1];
      this.setState({ curTeam: curTeam });
      this.setState({ school: curTeam.school });
      let students = []
      if (curTeam.users) {
        for (var i = 0; i < curTeam.users.length; i++) {
          const snapshot = await curTeam.users[i].get();

          if (snapshot.exists) {
            students.push(snapshot.data());
          }
        }
      } else {
        console.log("Got no students");
        students.push("No Team");
      }
      this.setState({ students: students });

    }).catch((error) => console.error(error));
  }

  render() {
    const { school, type, curTeam, students } = this.state;
    console.log(students, "LOGGED BABY");
    if (type == "coach")
      return (
        <View style={styles.container}>
          <Text>Team Log for {school}</Text>
          <Text style={{ fontSize: 26 }}>Students: </Text>
          {students.map((item, i) => {
            return (
              <Text key={i} style={{ fontSize: 20}}>{item.first} {item.last}</Text>
            );
          })}
        </View>
      );
      return (
        <View style={styles.container}>
          <Text>You must be a coach to view this screen.</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
