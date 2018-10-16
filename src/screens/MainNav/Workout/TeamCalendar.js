import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { range } from 'lodash';
import { Programs } from "../../../entities";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default class Calendar extends Component {

    constructor() {
        super();
        this.state = { currentDate : new Date(), selectedDate : new Date().getDate(), programsLoaded: false };
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
                    this.setState({ currentDate : this.state.currentDate, selectedDate : this.state.selectedDate,
                        program: curProgram, exercises: doc.data(), programsLoaded: true });
                });
            }

        }).catch((error) => console.error(error));
    }

    renderWeekDays() {
        let weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        return weekdays.map((day) => {
            return (
                <Text key={day} style={styles.calendar_weekdays_text}>{day.toUpperCase()}</Text>
            );
        });
    }

    renderCalendar() {
        let firstDayOfMonth = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), 1);
        let lastDayOfMonth = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth() + 1, 0);
        let sundayOfPreviousMonth = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), 0 - firstDayOfMonth.getDay());

        let daysArr = [];
        //range function does not support a range between the same numbers
        if (firstDayOfMonth.getDay() === 1) {
            daysArr.push(sundayOfPreviousMonth.getDate() + firstDayOfMonth.getDay());
        } else if (firstDayOfMonth.getDay() > 1) {
            daysArr = range(sundayOfPreviousMonth.getDate(), sundayOfPreviousMonth.getDate() + firstDayOfMonth.getDay());
        }

        //NOTE: new Date(year, month, 0) gets the second to last day of the previous month
        daysArr = daysArr.concat(range(firstDayOfMonth.getDate(), lastDayOfMonth.getDate() + 1));
        let grouped_days = this.getWeeksArray(daysArr);
        return grouped_days.map((week_days) => {
            return (
                <View style={styles.week_days}>
                    { this.renderDays(week_days) }
                </View>
            );
        });
    }

    getWeeksArray(days) {
        let weeks_r = [];
        let seven_days = [];
        let count = 0;
        days.forEach((day) => {
            count++;
            seven_days.push(day);
            if(count === 7){
                weeks_r.push(seven_days);
                count = 0;
                seven_days = [];
            }
        });
        if (count > 0) {
            for (let i = 1; count < 7; i++, count++) {
                seven_days.push(i);
            }
            weeks_r.push(seven_days);
        }
        return weeks_r;
    }

    renderDays(week_days) {
        //TODO fix the select bug with days that have the same number
        return week_days.map((day) => {
            return (
                <TouchableOpacity
                    onPress={this.onPressDay.bind(this, day)}
                    style={(this.state.selectedDate === day) ? styles.day_selected : styles.day}
                    noDefaultStyles={true}
                >
                    <Text style={styles.text_center}>{day}</Text>
                </TouchableOpacity>
            );
        });
    }

    onPressDay(day) {
        this.setState({ currentDate: this.state.currentDate, selectedDate: day});
        this.renderCalendar();
    }

    onPressNextMonth() {
        this.setState({ currentDate: new Date(this.state.currentDate.getFullYear(),
                this.state.currentDate.getMonth() + 1, this.state.currentDate.getDate())});
        this.renderCalendar();
    }

    onPressPreviousMonth() {
        this.setState({ currentDate: new Date(this.state.currentDate.getFullYear(),
                this.state.currentDate.getMonth() - 1, this.state.currentDate.getDate())});
        this.renderCalendar();
    }

    onPressNextYear() {
        this.setState({ currentDate: new Date(this.state.currentDate.getFullYear() + 1,
                this.state.currentDate.getMonth(), this.state.currentDate.getDate())});
        this.renderCalendar();
    }

    onPressPreviousYear() {
        this.setState({ currentDate: new Date(this.state.currentDate.getFullYear() - 1,
                this.state.currentDate.getMonth(), this.state.currentDate.getDate())});
        this.renderCalendar();
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
                    { this.renderWeekDays() }
                </View>
                <View>
                    { this.renderCalendar() }
                </View>
                <View style={styles.notes}>
                    <View style={styles.notes_notes}>
                        {this.state.exercises.exercises.map((item, i) => {
                            return (
                                <Text key={i} style={styles.notes_text}>{item.exName}</Text>
                            );
                        })}
                    </View>
                    <View style={[styles.notes_selected_date]}>
                        <Text style={styles.small_text}>8:00 PM</Text>
                        <Text style={styles.big_text}>{this.state.selectedDate}</Text>
                        <Text style={styles.small_text}>{this.state.exercises.meso}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    calendar_weekdays_text: {
        flex: 1,
        color: '#C0C0C0',
        textAlign: 'center'
    },
    container: {
        flex: 1
    },
    calendar_header: {
        flexDirection: 'row'
    },
    calendar_header_item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingRight: 40,
        paddingLeft: 40
    },
    calendar_header_text: {
        fontWeight: 'bold',
        fontSize: 20,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    text_center: {
        textAlign: 'center'
    },
    text_right: {
        textAlign: 'right'
    },
    header_text: {
        color: '#fff',
        fontSize: 20
    },
    bold_text: {
        fontWeight: 'bold'
    },
    week_days: {
        flexDirection: 'row'
    },
    day: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 17,
        margin: 2
    },
    day_selected: {
        flex: 1,
        backgroundColor: "#FA8405",
        padding: 17,
        margin: 2
    },
    day_text: {
        textAlign: 'center',
        color: '#A9A9A9',
        fontSize: 25
    },
    notes: {
        marginTop: 10,
        padding: 20,
        borderColor: '#F5F5F5',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        backgroundColor: '#FAFAFA'
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
        alignItems: 'flex-end',
        flexDirection: 'column'
    },
    small_text: {
        fontSize: 15,
        alignItems: 'flex-end',
        color: "#324151"
    },
    big_text: {
        fontSize: 50,
        fontWeight: 'bold',
        color: "#324151"
    },
    inline: {
        flexDirection: 'row'
    },
});