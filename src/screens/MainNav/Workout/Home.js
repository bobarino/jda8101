import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import LoginService from "../../../services/LoginService";
import Programs from "../../../entities/Programs";
import Spinner from "../../../components/Spinner";
import Button from "../../../components/Button";
import { dayStrings } from "../../../Utils";
import Exercises from "../../../entities/Exercises";
import IndividualExercise from "../Exercises/IndividualExercise";
import moment from "moment";

export default class Home extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
  };

  state = {
    program: undefined,
    curUser: null,
    curDay: null,
    curWeek: null,
    exers: [],
    loading: true
  }

  componentDidMount() {
    const curDay = moment().isoWeekday();
    const start_date = moment("2018-09-03");
    const today = moment()
    //Uncomment and use as curWeek when database is fully filled out
    //const curWeek = today.diff(start_date, 'week')
    const curWeek = 4

    Programs.getList().then((programs) => {
      const curProgram = programs[2];
      this.setState({ program: curProgram, curDay: curDay, curWeek: curWeek, loading: false });
    }).catch((error) => console.error(error));

    Exercises.getList().then((list) => this.setState({ exers: list }));

    this.setState({ curUser: LoginService.getCurrentUser() });
  }

  render() {

    if (this.state.loading) {
      return null;
    }

    const { program } = this.state;
    const { curDay, curWeek, loading } = this.state;
    const { curUser } = this.state;
    const { exers } = this.state
    //Hard coded for right now until database is working
    const exercises = [["Lunge with Ball", "Squat with Ball", "Scap Pushup", "Plank"],
                        ["Run Bout"],
                        ["Lunge to Sprint", "Scap Pushup", "Scap Dip", "Squat with Ball", "Hip Bridge"],
                        ["Run Bout", "Lunge to Sprint"],
                        ["Hip Bridge", "Lunge with Ball", "Squat with Ball", "Scap Pushup", "Scap Dip"],
                        ["None"],
                        ["None"],
                        ["None"],
                        ["None"],
                        ["None"],
                        ["None"],
                        ["None"],
                        ]

    const meso = program.weeks[curWeek].days[curDay].meso;
    const firstExercise = exercises[curDay][0]
    let startWorkout = exers.find(x => x.exName == firstExercise)

    //Exercise code for when Firebase is working
    /*
    exercises = []
    const numExercises = program.weeks[curWeek].days[curDay].exercises.length
    while (i < numExercises) {
      const exercise = program.weeks[curWeek].days[curDay].exercises[i].exName
      if (exercise) {
        exercises.push(exercise)
      }
    }
    */

    if (this.state.loading) return (
      <View style={styles.baseContainer} >
        <Spinner show />
      </View >
    );

    if (!curDay) return (
      <View style={styles.baseContainer} >
        <Text style={styles.headerText}>No Workout Today</Text>
      </View >
    );

    return (
      <View style={styles.baseContainer} >
        <Text style={styles.headerText}>{dayStrings[curDay]}{"'"}s Workout:</Text>
        <View style={styles.exerciseContiner}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={{ fontSize: 26 }}>Week: </Text>
            <Text style={{ fontSize: 26 }}>{curWeek}</Text>
          </View>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={{ fontSize: 26 }}>Mesocycle: </Text>
            <Text style={{ fontSize: 26 }}>{ meso }</Text>
          </View>
          <Text style={{ fontSize: 26 }}>Exercises: </Text>
          {exercises[curDay].map((item, i) => {
            return (
              <Text key={i} style={{ fontSize: 20, marginLeft: 20 }}>{item}</Text>
            );
          })}
          <Button style={{ width: "100%", height: 32, marginTop: 20, alignItems: "center", backgroundColor: "green" }}
          onPress={() => this.props.navigation.navigate("IndividualExercise", { exercise: startWorkout })}>
            <Text style={{ color: "white", fontSize: 24 }}>Start Workout</Text>
          </Button>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  exerciseContiner: {
    backgroundColor: "white",
    width: "100%",

    padding: 5,

    borderBottomWidth: 1,
    borderBottomColor: "grey"
  },
  headerText: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: "bold"
  }
});
