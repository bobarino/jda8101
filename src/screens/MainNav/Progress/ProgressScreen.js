import { createStackNavigator, createMaterialTopTabNavigator } from "react-navigation";

import History from "./History";
import Log from "./Log";

export const ProgTabNav = createMaterialTopTabNavigator({
  Log: {
    screen: Log,
    navigationOptions: {
      tabBarLabel: "New Entry",
    }
  },
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: "Training History",
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
    initialRouteName: "Log",
  });

export default function ProgressScreen(navigationOptionsFunc) {
  return createStackNavigator(
    { Progress: { screen: ProgTabNav } }, { navigationOptions: navigationOptionsFunc }
  );
}