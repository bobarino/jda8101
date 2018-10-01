import { createStackNavigator, createMaterialTopTabNavigator } from "react-navigation";

import Home from "./Home";
import Program from "./Program";
import Workout from "./Workout";
import TeamCalendar from "./TeamCalendar";


export const WorkoutTabNav = createMaterialTopTabNavigator({
  Today: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Today's Workout",
    }
  },
  Program: {
    screen: Program,
    navigationOptions: {
      tabBarLabel: "Your Program",
    }
  },
  TeamCalendar: {
    screen: TeamCalendar,
    navigationOptions: {
      tabBarLabel: "Team Calendar",
    }
  },
},
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#324151",
      },
      activeTintColor: "#fe1a27",
      inactiveTintColor: "#fff",
      labelStyle: {
        fontWeight: "bold",
        fontSize: 16,
      },

      indicatorStyle: {
        backgroundColor: "#fe1a27"
      }
    },
    swipeEnabled: true,
    initialRouteName: "Today",
  });

export const WorkoutStack = createStackNavigator({
  HomeScreen: { screen: WorkoutTabNav },
  LiveWorkout: {
    screen: Workout,
  },
}, {
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
      initialRouteName: "HomeScreen"
    }
  },
);

export default function WorkoutScreen(navigationOptionsFunc) {
  return createStackNavigator(
    { Workout: { screen: WorkoutStack } }, { navigationOptions: navigationOptionsFunc }
  );
}