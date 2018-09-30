import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";
import { Programs } from "../../../entities";

// const teamWorkout = { key: "teamWorkout", color: "#fe1a27" };
// const workout = { key: "workout", color: "#FA8405" };
const bgColor = "#324151";

function formatDate(date) {
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default class TeamCalendar extends Component {

  constructor(props) {
    super(props);
    const curDate = formatDate(new Date());
    this.state = {
      markedDates: { [curDate]: { selected: true, marked: true, selectedColor: bgColor } }
    };
    this.onDayPress = this.onDayPress.bind(this);
  }

  componentDidMount() {
    const curWeek = 1;
    const curDay = 2;
    Programs.getList().then(async (programs) => {
      const curProgram = programs[0];

      const week = curProgram.weeks[curWeek];
      let day = undefined;
      if (week) {
        day = week.days[curDay];
      }

      if (day) {
        day.get().then((doc) => {
          this.setState({ program: curProgram, day: doc.data() });
        });
      }

    }).catch((error) => console.error(error));
  }

  onDayPress(day) {
    this.setState({
      markedDates: { [day.dateString]: { selected: true, marked: true, selectedColor: bgColor } }
    });
  }

  render() {
    const { day, markedDates } = this.state;

    if (!day) return null;

    return (
      <View style={{ flex: 1 }}>
        <CalendarList
          style={{ flex: 0.2 }}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={true}
          onDayPress={this.onDayPress}
          monthFormat={"MMMM"}
          firstDay={1}
          hideDayNames={true}
          markingType={"multi-dot"}
          markedDates={markedDates}
        />
        <View style={styles.exContainer}>
          <Text style={styles.headerText}>Workout for {}</Text>
          <View style={styles.exerciseContiner}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Text style={{ fontSize: 16 }}>Week: </Text>
              <Text style={{ fontSize: 16 }}>{day.week}</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Text style={{ fontSize: 16 }}>Mesocycle: </Text>
              <Text style={{ fontSize: 16 }}>{day.meso}</Text>
            </View>
            <Text style={{ fontSize: 16 }}>Exercises: </Text>
            {day.exercises.map((item, i) => {
              return (
                <Text key={i} style={{ fontSize: 14, marginLeft: 20 }}>{item.exName}</Text>
              );
            })}
          </View>
        </View >
      </View>
    );
  }
}

const styles = StyleSheet.create({
  exContainer: {
    flex: 0.8,
    width: "100%",

    padding: 5,

    borderBottomWidth: 1,
    borderBottomColor: "grey"
  },
  headerText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold"
  }
});