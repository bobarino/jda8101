import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Agenda, Calendar, CalendarList } from 'react-native-calendars';
import { Header } from "react-navigation";

const teamWorkout = { key: 'teamWorkout', color: '#fe1a27' };
const workout = { key: 'workout', color: '#FA8405' };
const bgColor = '#324151';

export default class TeamCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.markedDates = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  onDayPress(day, markedDates) {
    console.log(day);
    var index = markedDates.indexOf(day.dateString);
    var oldDay = markedDates[day.dateString];
    markedDates.splice(index, 1);
    oldDay.selected = true;
    this.setState({
      selected: day.dateString,
      markedDates: markedDates.concat([oldDay])
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CalendarList
          style={{ flex: 0.2 }}
          // Enable horizontal scrolling, default = false
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
          // Callback which gets executed when visible months change in scroll view. Default = undefined
          onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
          // Enable or disable vertical scroll indicator. Default = false
          showScrollIndicator={true}
          // // Initially visible month. Default = Date()
          // current={'2018-09-01'}
          // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // minDate={'2012-05-10'}
          // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // maxDate={'2012-05-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day, markedDates) => { console.log('day press') }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day, markedDates) => console.log('day press')}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMMM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => { console.log('month changed', month) }}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          // renderArrow={(direction) => (<Arrow />)}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={true}
          // Show week numbers to the left. Default = false
          showWeekNumbers={false}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          // onPressArrowLeft={subtractMonth => subtractMonth()}
          // Handler which gets executed when press arrow icon left. It receive a callback can go next month
          // onPressArrowRight={addMonth => addMonth()}

          markingType={'multi-dot'}

          markedDates={{
            '2018-09-29': { dots: [teamWorkout, workout], disableTouchEvent: false },
            '2018-09-30': { dots: [workout], disableTouchEvent: false, selected: true, selectedColor: bgColor },
            '2018-10-01': { dots: [workout], disableTouchEvent: false },
          }}
        />
        <View style={{ flex: 0.8, backgroundColor: bgColor }}>
          <Text>Workout</Text>
          <Text>Barbell Lunge</Text>
          <Text>Type: Lower Body</Text>
          <Text>Deadlift</Text>
          <Text>Type: Lower Body</Text>
        </View>
      </View>
    );
  }
}