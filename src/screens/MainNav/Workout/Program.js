import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Programs } from "../../../entities";
import Collapsible from "react-native-collapsible";
import Spinner from "../../../components/Spinner";
import Button from "../../../components/Button";
import Ionicons from "react-native-vector-icons/Ionicons";

const { height } = Dimensions.get("window");

export default class Program extends Component {

  state = {
    program: undefined, curDay: 0, curWeek: 0, loading: true, screenHeight: height,
  };

  componentDidMount() {
    Programs.getList().then(async (programs) => {
      const curProgram = programs[0];

      const p = Object.assign({}, curProgram);
      p.weeks = [];

      const open = {};

      for (const week in curProgram.weeks) {
        const w = Object.assign([], curProgram.weeks[week]);
        w.days = [];
        open[`w${week.num}`] = false;
        for (const day in curProgram.weeks[week].days) {
          open[`w${week.num}d${day.day}`] = false;

          const snapshot = await curProgram.weeks[week].days[day].get();

          if (snapshot.exists) {
            w.days.push(snapshot.data());
          }

        }
        p.weeks.push(w);
      }

      this.setState({ program: p, open, loading: false });

    }).catch((error) => console.error(error));
  }

  toggleWeek = (w) => {
    let curState = this.state.open[`w${w.num}`];
    if (curState === undefined) {
      curState = false;
    }

    const newState = this.state.open;
    newState[`w${w.num}`] = !curState;

    this.setState({ open: newState });
  }

  toggleDay = (w, d) => {
    let curState = this.state.open[`w${w.num}d${d.day}`];
    if (curState === undefined) {
      curState = false;
    }

    const newState = this.state.open;
    newState[`w${w.num}d${d.day}`] = !curState;

    this.setState({ open: newState });
  }


  ex = (d) => {
    const toReturn = [];
    if (d.exercises.length != 0) {
      for (const e in d.exercises) {
        var c = d.exercises[e];
        toReturn.push(
          <View key={e}>
            <Text style={styles.exHead}>{c.exName + ": "}</Text>
            <Text style={styles.exText}>{c.sets + "x" + (c.unit == "Time" ? c.time : c.reps) + (c.unit == "Time" ? " seconds" : " reps")}</Text>
          </View>
        );
      }
    } else {
      toReturn.push(
        <Text key="rest" style={styles.exText}>Rest Day!</Text>
      );
    }
    return toReturn;
  }

  day = (w, d) => {
    const open = this.state.open[`w${w.num}d${d.day}`];
    const iconName = !open ? "ios-arrow-forward" : "ios-arrow-down";
    return (
      <View key={`w${w.num}d${d.day}`}>
        <Button style={styles.dayButton} onPress={() => this.toggleDay(w, d)}>
          <View style={{ flexDirection: "row", width: "100%", height: 32 }}>
            <Ionicons style={styles.chevron} name={iconName} size={32} color="#9599a2" />
            <Text style={styles.dayButtonText}>{"Day: " + d.day}</Text>
          </View>
        </Button>
        <Collapsible collapsed={!this.state.open[`w${w.num}d${d.day}`]}>
          {this.ex(d)}
        </Collapsible>
      </View >
    );
  }

  week = (w) => {
    const iconName = !this.state.open[`w${w.num}`] ? "ios-arrow-forward" : "ios-arrow-down";
    return (
      <View key={`w${w.num}`}>
        <Button style={styles.weekButton} onPress={() => this.toggleWeek(w)}>
          <View style={{ flexDirection: "row", width: "100%", height: 32 }}>
            <Ionicons style={styles.chevron} name={iconName} size={32} color="#9599a2" />
            <Text style={styles.weekButtonText}>{"Week " + w.num + ": " + w.meso}</Text>
          </View>
        </Button>
        <Collapsible collapsed={!this.state.open[`w${w.num}`]}>
          {w.days.map((d) => this.day(w, d))}
        </Collapsible>
      </View>
    );
  }

  render() {
    if (this.state.loading) return (
      <View style={styles.baseContainer} >
        <Spinner show />
      </View >
    );

    var p = this.state.program;

    return (
      <ScrollView
        style={styles.baseContainer}
        scrollEnabled={true}
        contentContainerStyle={styles.scrollview}
      >
        <Text style={styles.headerText}> {p.sport + " - Level: " + p.level}</Text>
        {p.weeks.map((w) => this.week(w))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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

