import { createStackNavigator, createMaterialTopTabNavigator } from "react-navigation";

import Home from "./Home";
import Program from "./Program";
import Workout from "./Workout";
import TeamCalendar from "./TeamCalendar";
import SelectWorkout from "./SelectWorkout";
import PreviewWorkout from "./PreviewWorkout";


export const WorkoutTabNav = createMaterialTopTabNavigator({
  Today: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
    }
  },
  Program: {
    screen: Program,
    navigationOptions: {
      tabBarLabel: "Program",
    }
  },
  TeamCalendar: {
    screen: TeamCalendar,
    navigationOptions: {
      tabBarLabel: "Calendar",
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
  SelectWorkout: {
    screen: SelectWorkout,
  },
  PreviewWorkout: {
    screen: PreviewWorkout
  }
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