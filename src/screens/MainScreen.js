import React from "react";
import { SafeAreaView, Image, View, Button, Dimensions, ScrollView } from "react-native";
import { createStackNavigator, createDrawerNavigator, DrawerItems } from "react-navigation";

import Login from "./Login/Login";
import Register from "./Login/Register";
import ForgotPassword from "./Login/ForgotPassword";

import ExercisesScreen from "./MainNav/ExercisesScreen";
import WorkoutScreen from "./MainNav/Workout/WorkoutScreen";
import ProfileScreen from "./MainNav/ProfileScreen";
import ContactScreen from "./MainNav/ContactScreen";
import SettingsScreen from "./MainNav/SettingsScreen";
import ProgressScreen from "./MainNav/Progress/ProgressScreen";

import LoginService from "../services/LoginService";

import { LogoImage } from "../Images";

import Ionicons from "react-native-vector-icons/Ionicons";


function createNavigationHeader(name) {
  return ({ navigation }) => ({
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
    headerLeft: <Ionicons name="md-menu" style={{ padding: 10 }}
      size={35} color="#9599a2" onPress={() => navigation.openDrawer()} />
  });
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
        color="#fe1a27"
        title="Log Out"
        onPress={() => LoginService.logout().then(() => props.navigation.navigate("Login"))}
      />
    </ScrollView>
  </SafeAreaView>
);

const MainNav = createDrawerNavigator({
  Workout: WorkoutScreen(createNavigationHeader("Workout")),
  Exercises: ExercisesScreen(createNavigationHeader("Excercises")),
  Progress: ProgressScreen(createNavigationHeader("Progress")),
  Profile: ProfileScreen(createNavigationHeader("Profile")),
  Settings: SettingsScreen(createNavigationHeader("Settings")),
  Contact: ContactScreen(createNavigationHeader("Contact")),
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
    initialRouteName: LoginService.isLoggedIn() ? "MainNav" : "Login",
  },
);
