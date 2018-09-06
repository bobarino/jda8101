import { createStackNavigator, createMaterialTopTabNavigator } from "react-navigation";

import Home from "./Home";
import Program from "./Program";
import Workout from "./Workout";
import WorkLive from "./WorkLive";


export const TodayStack = createStackNavigator({
  Home: { screen: Home },
  Workout: { screen: Workout },
  WorkLive: { screen: WorkLive },
}, {
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
      initialRouteName: "Home"
    },
  },
);

export const WorkoutTabNav = createMaterialTopTabNavigator({
  Today: {
    screen: TodayStack,
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

export default function WorkoutScreen(navigationOptionsFunc) {
  return createStackNavigator(
    { Workout: { screen: WorkoutTabNav } }, { navigationOptions: navigationOptionsFunc }
  );
}