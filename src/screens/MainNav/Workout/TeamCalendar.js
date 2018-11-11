import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { getWorkoutFromDates } from "../../../Utils";
import LoginService from "../../../services/LoginService";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class Calendar extends Component {

  constructor() {
    super();
    this.state = {
      currentDate: new Date(),
      selectedDate: new Date(),
      programsLoaded: false,
      noProgram: false,
    };
  }

  componentDidMount() {
    LoginService.getCurrentUser().then(async (user) => {
      if (!user.curProgram) {
        this.setState({ noProgram: true, programsLoaded: true });
      } else {
        const program = await user.curProgram.get();
        if (!program.exists) this.setState({ noProgram: true, programsLoaded: true });
        else {
          this.setState({ program: program.data(), programStart: user.curProgramStart, programsLoaded: true });
          this.updateNotes();
        }
      }
    }).catch((e) => console.error(e));
  }

  updateNotes() {
    if (this.state.noProgram || !this.state.programsLoaded) return;
    getWorkoutFromDates(this.state.program, this.state.programStart, this.state.selectedDate).then((ex) => {
      this.setState({ workout: ex });
    });
  }

  renderWeekDays() {
    let weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return weekdays.map((day) => {
      return (
        <Text key={day} style={styles.calendar_weekdays_text}>{day.toUpperCase()}</Text>
      );
    });
  }

  renderCalendar() {
    let currentDate = this.state.currentDate;
    // NOTE: new Date(year, month, 0) gets the second to last day of the previous month
    let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    let sundayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0 - firstDayOfMonth.getDay());

    //I"m not proud of what"s below
    let daysArr = [];
    let sevenDays = [];
    for (let i = sundayOfPreviousMonth.getDate() + 1; i < sundayOfPreviousMonth.getDate() + firstDayOfMonth.getDay() + 1; i++) {
      sevenDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, i));
    }
    for (let i = 1, isLastWeek = false; !(sevenDays.length === 0 && isLastWeek); i++) {
      if (isLastWeek && sevenDays.length > 0) {
        sevenDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i));
      } else {
        sevenDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
      }
      if (sevenDays.length > 0 && sevenDays.length % 7 === 0) {
        daysArr.push(sevenDays);
        sevenDays = [];
      }
      if (i === lastDayOfMonth.getDate()) {
        isLastWeek = true;
        i = 0;
      }
    }
    daysArr.push(sevenDays);

    return daysArr.map((week_days, i) => {
      return (
        <View key={i} style={styles.week_days}>
          {this.renderDays(week_days)}
        </View>
      );
    });
  }

  renderDays(week_days) {
    const today = new Date();
    return week_days.map((day, i) => {
      if (this.state.currentDate.getMonth() != day.getMonth()) {
        return (
          <View key={i} style={styles.day_wrongmonth}>
            <Text style={styles.text_center}>{day.getDate()}</Text>
          </View>);
      }

      let buttonStyle = styles.day;
      if (this.state.selectedDate.getDate() === day.getDate()
        && this.state.selectedDate.getMonth() === day.getMonth()
        && this.state.selectedDate.getFullYear() === day.getFullYear()) {
        if (today.getDate() === day.getDate()
          && today.getMonth() === day.getMonth()
          && today.getFullYear() === day.getFullYear())
          buttonStyle = styles.day_today_selected;
        else
          buttonStyle = styles.day_selected;
      } else if (today.getDate() === day.getDate()
        && today.getMonth() === day.getMonth()
        && today.getFullYear() === day.getFullYear()) {
        buttonStyle = styles.day_today;
      }



      return (
        <TouchableOpacity
          key={i}
          onPress={this.onPressDay.bind(this, day.getDate(), day.getMonth())}
          style={buttonStyle}
          noDefaultStyles={true}
        >
          <Text style={styles.text_center}>{day.getDate()}</Text>
        </TouchableOpacity>
      );
    });
  }

  renderNotes() {
    if (this.state.noProgram)
      return (
        <View style={styles.notes}><Text>No Program to Display</Text></View>
      );

    if (!this.state.workout || this.state.workout.exercises.length === 0)
      return (
        <View style={styles.notes}><Text>No Workout on this Date</Text></View>
      );

    return (<View style={styles.notes}><View style={styles.notes_notes}>
      {this.state.workout.exercises.map((item, i) => {
        return (
          <Text key={i} style={styles.notes_text}>{item.exName}</Text>
        );
      })}
    </View>
      <View style={[styles.notes_selected_date]}>
        <Text style={styles.small_text}>8:00 PM</Text>
        <Text style={styles.big_text}>{this.state.selectedDate.getDate()}</Text>
        <Text style={styles.small_text}>{this.state.workout.meso}</Text>
      </View>
    </View>
    );
  }

  onPressDay(date, month) {
    // don't let presses on greyed out butons
    if (month != this.state.selectedDate.getMonth()) return;
    this.setState({ selectedDate: new Date(this.state.currentDate.getFullYear(), month, date) }, () => this.updateNotes());
  }

  onPressNextMonth() {
    this.setState({
      currentDate: new Date(this.state.currentDate.getFullYear(),
        this.state.currentDate.getMonth() + 1, this.state.currentDate.getDate())
    }, () => this.updateNotes());
  }

  onPressPreviousMonth() {
    this.setState({
      currentDate: new Date(this.state.currentDate.getFullYear(),
        this.state.currentDate.getMonth() - 1, this.state.currentDate.getDate())
    }, () => this.updateNotes());
  }

  onPressNextYear() {
    this.setState({
      currentDate: new Date(this.state.currentDate.getFullYear() + 1,
        this.state.currentDate.getMonth(), this.state.currentDate.getDate()),
    }, () => this.updateNotes());
  }

  onPressPreviousYear() {
    this.setState({
      currentDate: new Date(this.state.currentDate.getFullYear() - 1,
        this.state.currentDate.getMonth(), this.state.currentDate.getDate()),
    }, () => this.updateNotes());
  }

  render() {
    if (!this.state.programsLoaded) return null;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.calendar_header}>
          <View style={styles.calendar_header_item}>
            <TouchableOpacity
              onPress={this.onPressPreviousYear.bind(this)}
            >
              <Icon name="chevron-left" size={18} color="#333" />
            </TouchableOpacity>
            <Text style={styles.calendar_header_text}>{this.state.currentDate.getFullYear()}</Text>
            <TouchableOpacity
              onPress={this.onPressNextYear.bind(this)}
            >
              <Icon name="chevron-right" size={18} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.calendar_header_item}>
            <TouchableOpacity
              onPress={this.onPressPreviousMonth.bind(this)}
            >
              <Icon name="chevron-left" size={18} color="#333" />
            </TouchableOpacity>
            <Text style={styles.calendar_header_text}>{monthNames[this.state.currentDate.getMonth()]}</Text>
            <TouchableOpacity
              onPress={this.onPressNextMonth.bind(this)}
            >
              <Icon name="chevron-right" size={18} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          {this.renderWeekDays()}
        </View>
        <View>
          {this.renderCalendar()}
        </View>
        {this.renderNotes()}
      </ScrollView >
    );
  }

}

const styles = StyleSheet.create({
  calendar_weekdays_text: {
    flex: 1,
    color: "#C0C0C0",
    textAlign: "center"
  },
  container: {
    flex: 1
  },
  calendar_header: {
    flexDirection: "row"
  },
  calendar_header_item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingRight: 40,
    paddingLeft: 40
  },
  calendar_header_text: {
    fontWeight: "bold",
    fontSize: 20,
    justifyContent: "center"
  },
  row: {
    flexDirection: "row"
  },
  text_center: {
    textAlign: "center"
  },
  week_days: {
    flexDirection: "row"
  },
  day: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
    margin: 2,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0)"
  },
  day_selected: {
    flex: 1,
    backgroundColor: "#FA8405",
    padding: 15,
    margin: 2,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0)"
  },
  day_wrongmonth: {
    flex: 1,
    backgroundColor: "darkgrey",
    padding: 15,
    margin: 2,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0)"
  },
  day_today: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
    margin: 2,
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid"
  },
  day_today_selected: {
    flex: 1,
    backgroundColor: "#FA8405",
    padding: 15,
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "solid"
  },
  notes: {
    marginTop: 10,
    padding: 20,
    borderColor: "#F5F5F5",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    flex: 1,
    marginBottom: 10
  },
  notes_notes: {
    flex: 3
  },
  notes_text: {
    fontSize: 18,
    color: "#fe1a27"
  },
  notes_selected_date: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "column"
  },
  small_text: {
    fontSize: 15,
    alignItems: "flex-end",
    color: "#324151"
  },
  big_text: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#324151"
  }
});
