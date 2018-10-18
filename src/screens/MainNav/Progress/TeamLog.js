import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Teams } from "../../../entities";
import Ionicons from "react-native-vector-icons/Ionicons";
import Collapsible from "react-native-collapsible";
import Spinner from "../../../components/Spinner";
import Button from "../../../components/Button";


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
      let students = [];
      const open = {};
      if (curTeam.users) {
        for (var i = 0; i < curTeam.users.length; i++) {
          const snapshot = await curTeam.users[i].get();

          if (snapshot.exists) {
            students.push(snapshot.data());
            open[`u${snapshot.data().last}`] = false;
          }
        }
      } else {
        console.log("Got no students");
        students.push("No Team");
      }
      this.setState({ students: students, open: open });

    }).catch((error) => console.error(error));
  }

  toggleUser = (u) => {
    let curState = this.state.open[`u${u.last}`];
    if (curState === undefined) {
      curState = false;
    }

    const newState = this.state.open;
    newState[`u${u.last}`] = !curState;

    this.setState({ open: newState });
  }

  progress = (p, i) => {
    var title = "";
    var h = 32;
    var end = "";
    if (i == 0) {
      title = "TRIMP Score";
    } else if (i == 1) {
      title = "Date";
      h = 64;
    } else {
      title = "Duration";
      end = "minutes";
    }
    return (
          <View style={{ flexDirection: "row", width: "100%", height: h }}>
            <Ionicons style={styles.chevron} size={32} color="#9599a2" />
            <Text style={styles.dayButtonText}>{title + ": " + p + " " + end}</Text>
          </View>
    );
  }

  users = (u) => {
    const iconName = !this.state.open[`u${u.last}`] ? "ios-arrow-forward" : "ios-arrow-down";
    return (
      <View key={`u${u.last}`}>
        <Button style={styles.weekButton} onPress={() => this.toggleUser(u)}>
          <View style={{ flexDirection: "row", width: "100%", height: 32 }}>
            <Ionicons style={styles.chevron} name={iconName} size={32} color="#9599a2" />
            <Text style={styles.weekButtonText}>{u.first + " " + u.last}</Text>
          </View>
        </Button>
        <Collapsible collapsed={!this.state.open[`u${u.last}`]}>
          {u.curProgress.map((p, i) => this.progress(p, i))}
        </Collapsible>
      </View>
    );
  }

  render() {
    const { school, type, curTeam, students, open } = this.state;
    if (type == "coach")
    return (
      <ScrollView
        style={styles.baseContainer}
        scrollEnabled={true}
        contentContainerStyle={styles.scrollview}
      >
      <Text style={{ fontSize: 26, padding: 15 }}>Team Log for {school}:</Text>
        {students.map((u) => this.users(u))}
      </ScrollView>
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
  },
  baseContainer: {
    width: "100%",
    height: "100%"
  },
  headerText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  weekButton: {
    paddingLeft: 20,
    height: 32,
  },
  weekButtonText: {
    paddingLeft: 20,
    fontSize: 20
  },
  dayButton: {
    height: 32,
    paddingLeft: 40,
  },
  dayButtonText: {
    paddingLeft: 20,
    fontSize: 20
  },
  exText: {
    textAlign: "center"
  },
  exHead: {
    textAlign: "center",
    fontWeight: "bold"
  },
  scrollview: {
    flexGrow: 1
  }
});
