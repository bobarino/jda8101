import React, { Component } from "react";
import { Text, View, StyleSheet, Button, ScrollView, Dimensions } from "react-native";
import { Programs } from "../../../entities";
import { getWorkoutDayAndWeek } from "../../../Utils";
import Collapsible from "react-native-collapsible";
import Spinner from "../../../components/Spinner";

const { height } = Dimensions.get("window");

export default class Program extends Component {

  startDate = new Date("09/03/2018");
  curDate = new Date("09/05/2018");

  state = {
    program: undefined, curDay: 0, curWeek: 0, loading: true, screenHeight: height,
  };

  componentDidMount() {
    Programs.getList().then(async (programs) => {
      const curProgram = programs[0];

      const p = Object.assign({}, curProgram);
      p.weeks = [];

      for (const week in curProgram.weeks) {
        const w = Object.assign([], curProgram.weeks[week]);
        w.days = [];
        for (const day in curProgram.weeks[week].days) {

          const snapshot = await curProgram.weeks[week].days[day].get();

          if (snapshot.exists) {
            w.days.push(snapshot.data());
          }

        }
        p.weeks.push(w);
      }

      this.setState({ program: p, loading: false });

    }).catch((error) => console.error(error));
  }

  toggleWeek = (w) => {
    let curState = this.state[`w${w.num}`];
    if (curState === undefined) {
      curState = true;
    }
    this.setState({ [`w${w.num}`]: !curState });
  }

  toggleDay = (w, d) => {
    let curState = this.state[`w${w.num}d${d.day}`];
    if (curState === undefined) {
      curState = true;
    }
    this.setState({ [`w${w.num}d${d.day}`]: !curState });
  }


  ex = (d) => {
    const toReturn = [];
    if (d.exercises.length != 0) {
      for (const e in d.exercises) {
        var c = d.exercises[e];
        toReturn.push(
          <View>
            <Text style={styles.exHead}>{c.exName + ": "}</Text>
            <Text style={styles.exText}>{c.sets + "x" + (c.unit == "Time" ? c.time : c.reps) + (c.unit == "Time" ? " seconds" : " reps")}</Text>
          </View>
        );
      }
    } else {
      toReturn.push(
        <Text style={styles.exText}>Rest Day!</Text>
      );
    }
    return toReturn;
  }

  day = (w, d) => {
    return (
      <View key={d.num}>
        <Button style={styles.button}
          title={"Day: " + d.day}
          onPress={() => this.toggleDay(w, d)}
        />
        <Collapsible collapsed={this.state[`w${w.num}d${d.day}`]}>
          {this.ex(d)}
        </Collapsible>
      </View>
    );
  }

  week = (w) => {
    return (
      <View key={w.num}>
        <Button style={styles.button}
          title={"Week " + w.num + ": " + w.meso}
          onPress={() => this.toggleWeek(w)}
        />
        <Collapsible collapsed={this.state[`w${w.num}`]}>
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

    const scrollEnabled = this.state.screenHeight > height;
    return (
      <ScrollView
        style={styles.baseContainer}
        scrollEnabled={scrollEnabled}
        contentContainerStyle={styles.scrollview}
        onContentSizeChange={(w, h) => this.setState({ screenHeight: h })}
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
  button: {
    color: "white",
    padding: 5
  },
  headerText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
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

