import React from "react";
import { SafeAreaView, Image, View, Text, Dimensions, ScrollView, Alert } from "react-native";
import { createStackNavigator, createDrawerNavigator, DrawerItems } from "react-navigation";

import Login from "./Login/Login";
import Register from "./Login/Register";
import ForgotPassword from "./Login/ForgotPassword";

import ExercisesScreen from "./MainNav/Exercises/ExercisesScreen";
import WorkoutScreen from "./MainNav/Workout/WorkoutScreen";
import ProfileScreen from "./MainNav/ProfileScreen";
import TeamRosterScreen from "./MainNav/TeamRosterScreen";
import FeedbackScreen from "./MainNav/FeedbackScreen";
import SettingsScreen from "./MainNav/SettingsScreen";
import ProgressScreen from "./MainNav/Progress/ProgressScreen";

import LoginService from "../services/LoginService";
import Button from "../components/Button";

import { LogoImage } from "../Images";

import Ionicons from "react-native-vector-icons/Ionicons";


function createNavigationHeader(name) {
  return ({ navigation }) => {

    let headerButton = null;

    if (navigation.getParam("workoutActive", false)) {
      headerButton = (
        <Button style={{ paddingLeft: 10 }} onPress={() => {
          Alert.alert(
            "Warning",
            "Are you sure you want to cancel your active workout?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "OK", onPress: () => {
                  navigation.setParams({ workoutActive: false });
                  navigation.navigate("HomeScreen");
                }
              },
            ],
            { cancelable: true }
          );
        }}>
          <Ionicons name="md-exit"
            size={35} color="#9599a2" />
        </Button>
      );
    } else {
      headerButton = (
        <Button style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()}>
          <Ionicons name="md-menu"
            size={35} color="#9599a2" />
        </Button>
      );
    }

    return {
      initialRouteName: name,
      drawerLabel: name,
      headerMode: "screen",
      headerTitle: name,
      headerStyle: {
        backgroundColor: "#324151",
      },
      headerTintColor: "#9599a2",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerLeft: headerButton
    };
  };
}

const { width } = Dimensions.get("window");

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{
      height: 220, backgroundColor: "#9599a2",
      alignItems: "center", justifyContent: "center"
    }}>
      <Image source={LogoImage}
        style={{ height: 180, width: 220, borderRadius: 0 }} />
    </View>

    <ScrollView style={{ backgroundColor: "#9599a2" }} contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}>
      <DrawerItems {...props} />
      <Button
        style={{ width: "100%", height: 50, backgroundColor: "#9599a2" }}
        onPress={() => LoginService.logout().then(() => props.navigation.navigate("Login"))}
      >
        <Text style={{ textAlign: "center", fontSize: 12, color: "black" }}>Log Out</Text>
      </Button>
    </ScrollView>
  </SafeAreaView>
);

const MainNav = createDrawerNavigator({
  Workout: WorkoutScreen(createNavigationHeader("Workout")),
  Exercises: ExercisesScreen(createNavigationHeader("Excercises")),
  Progress: ProgressScreen(createNavigationHeader("Progress")),
  Profile: ProfileScreen(createNavigationHeader("Profile")),
  "Team Roster": TeamRosterScreen(createNavigationHeader("Team Roster")),
  Settings: SettingsScreen(createNavigationHeader("Settings")),
  Feedback: FeedbackScreen(createNavigationHeader("Feedback")),
},
  {
    contentComponent: CustomDrawerComponent,
    drawerWidth: width * .65,
  }
);

const LoginScreen = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  ForgotPassword: { screen: ForgotPassword },
}, {
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
    initialRouteName: "Login"
  },
);

export const MainScreen = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    MainNav: { screen: MainNav }
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
    initialRouteName: "Login",
  },
);
