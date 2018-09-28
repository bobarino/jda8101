import React, { Component } from "react";
import { Text, View, StyleSheet, Button, ScrollView, Dimensions } from "react-native";
import { Programs } from "../../../entities";
import { getWorkoutDayAndWeek, dayStrings } from "../../../Utils";
import Collapsible from 'react-native-collapsible';
import Spinner from "../../../components/Spinner";

const {height} = Dimensions.get('window');

export default class Program
  extends Component {

  startDate = new Date("09/03/2018");
  curDate = new Date("09/05/2018");

  state = { program: undefined, curDay: 0, curWeek: 0, loading: true, screenHeight: height,
  			w1: true, w1d0:true, w1d1: true, w1d2: true, w1d3: true, w1d4:true,
  			w2: true, w2d0:true, w2d1: true, w2d2: true, w2d3: true, w2d4:true};

  componentDidMount() {
    // const curDate = new Date();

    const { curDay, curWeek } = getWorkoutDayAndWeek(this.startDate, this.curDate);

    Programs.getList().then((programs) => {
      var p = programs[0];
      
      for (var week in p.weeks) {
      	for (var day in p.weeks[week].days) {
      		p.weeks[week].days[day] = p.weeks[week].days[day].get().data();
      		//.then((workout) => {
      		//	p.weeks[week].days[day] = workout.data();
      		//	console.log(p.weeks[week].days[day]);
      		//}).catch((error) => console.error(error));
      		//console.log(p.weeks[week].days[day]);
      	}
      }

      const program = p;
      this.setState({ program, curDay, curWeek, loading: false });
      console.log("Prog: " + this.state.program.id);
      console.log(this.state.program);

    }).catch((error) => console.error(error));
  }


  	ex = (d) => {
  		toReturn = [];
  		if (d.exercises.length != 0) {
	  		for (e in d.exercises) {
	  			var c = d.exercises[e];
	  			toReturn.push(
	  				<View>
	  					<Text style={styles.exHead}>{c.exName + ": "}</Text>
	  					<Text style={styles.exText}>{c.sets + "x" + (c.unit == "Time" ? c.time : c.reps) + (c.unit == "Time" ? " secs" : " reps")}</Text>
					</View>
				)
	  		}	
  		} else {
			toReturn.push(
				<Text style={styles.exText}>Rest Day!</Text>
			)	  			
  		}
  		return toReturn;
  	}

	render() {
		if (this.state.loading) return (
			<View style={styles.baseContainer} >
        		<Spinner show />
      		</View >
		);

		var p = this.state.program;

		// var weekList = []

		// for (var week in p.weeks) {
		// 	var curTrig = "col" + week;
		// 	this.state[curTrig] = true;
		// 	weekList.push(		
		// 		<Button key = {curTrig}
		// 			title = {"Week " + p.weeks[week].num + ": " + p.weeks[week].meso + " " + curTrig}
		// 			onPress = {() => {this.butPush(week);}} 
		// 		/>
		// 	);
		// }

		// <Button 
		// 	title = {"Week " + p.weeks[0].num + ": " + p.weeks[0].meso}
		// 	onPress = {() => this.setState({b: !this.state.b})}
		// />
		// <Collapsible collapsed = {this.state.b}>
		// 	<Text>POOP</Text>
		// </Collapsible>


		// return (
		// 	<View style = {styles.baseContainer}>
		// 		<Text>{p.sport + " - Level: " + p.level}</Text>
		// 		{weekList}
		// 	</View>
		// );
		onContentSizeChange = (w, h) => {
			this.setState({screenHeight: h});
		}
		const scrollEnabled = this.state.screenHeight > height;
		return (
			<ScrollView 
				style = {styles.baseContainer}
				scrollEnabled={scrollEnabled}
				contentContainerStyle = {styles.scrollview}
				onContentSizeChange={this.onContentSizeChange}
			>
				<Text style={styles.headerText}> {p.sport + " - Level: " + p.level}</Text>
				<Button style={styles.button}
					title = {"Week " + p.weeks[0].num + ": " + p.weeks[0].meso}
					onPress = {() => this.setState({w1: !this.state.w1})}
				/>
				<Collapsible collapsed = {this.state.w1}>
					<Button style={styles.button}
						title = {"Day: " + p.weeks[0].days[0].day}
						onPress = {() => this.setState({w1d0: !this.state.w1d0})}
					/>
					<Collapsible collapsed = {this.state.w1d0}>
						{ this.ex(p.weeks[0].days[0]) }
					</Collapsible>

					<Button style={styles.button}
						title = {"Day: " + p.weeks[0].days[1].day}
						onPress = {() => this.setState({w1d1: !this.state.w1d1})}
					/>
					<Collapsible collapsed = {this.state.w1d1}>
						{ this.ex(p.weeks[0].days[1]) }
					</Collapsible>

					<Button style={styles.button}
						title = {"Day: " + p.weeks[0].days[2].day}
						onPress = {() => this.setState({w1d2: !this.state.w1d2})}
					/>
					<Collapsible collapsed = {this.state.w1d2}>
						{ this.ex(p.weeks[0].days[2]) }
					</Collapsible>

					<Button style={styles.button}
						title = {"Day: " + p.weeks[0].days[3].day}
						onPress = {() => this.setState({w1d3: !this.state.w1d3})}
					/>
					<Collapsible collapsed = {this.state.w1d3}>
						{ this.ex(p.weeks[0].days[3]) }
					</Collapsible>	

					<Button style={styles.button}
						title = {"Day: " + p.weeks[0].days[4].day}
						onPress = {() => this.setState({w1d4: !this.state.w1d4})}
					/>
					<Collapsible collapsed = {this.state.w1d4}>
						{ this.ex(p.weeks[0].days[4]) }
					</Collapsible>		
				</Collapsible>
				<Button style={styles.button}
					title = {"Week " + p.weeks[1].num + ": " + p.weeks[1].meso}
					onPress = {() => this.setState({w2: !this.state.w2})}
				/>
				<Collapsible collapsed = {this.state.w2}>
					<Button style={styles.button}
						title = {"Day: " + p.weeks[1].days[0].day}
						onPress = {() => this.setState({w2d0: !this.state.w2d0})}
					/>
					<Collapsible collapsed = {this.state.w2d0}>
						{ this.ex(p.weeks[1].days[0]) }
					</Collapsible>

					<Button style={styles.button}
						title = {"Day: " + p.weeks[1].days[1].day}
						onPress = {() => this.setState({w2d1: !this.state.w2d1})}
					/>
					<Collapsible collapsed = {this.state.w2d1}>
						{ this.ex(p.weeks[1].days[1]) }
					</Collapsible>

					<Button style={styles.button}
						title = {"Day: " + p.weeks[1].days[2].day}
						onPress = {() => this.setState({w2d2: !this.state.w2d2})}
					/>
					<Collapsible collapsed = {this.state.w2d2}>
						{ this.ex(p.weeks[1].days[2]) }
					</Collapsible>

					<Button style={styles.button}
						title = {"Day: " + p.weeks[1].days[3].day}
						onPress = {() => this.setState({w2d3: !this.state.w2d3})}
					/>
					<Collapsible collapsed = {this.state.w2d3}>
						{ this.ex(p.weeks[1].days[3]) }
					</Collapsible>

					<Button style={styles.button}
						title = {"Day: " + p.weeks[1].days[4].day}
						onPress = {() => this.setState({w2d4: !this.state.w2d4})}
					/>
					<Collapsible collapsed = {this.state.w2d4}>
						{ this.ex(p.weeks[1].days[4]) }
					</Collapsible>		
				</Collapsible>
			</ScrollView>
		);
  	}
}

const styles = StyleSheet.create({
  baseContainer: {
    width: "100%",
    height: "100%"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
  	color: "white",
  	padding: 5
  },
  headerText: {
  	marginTop: 10,
  	marginBottom: 10,
  	fontSize:32,
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

