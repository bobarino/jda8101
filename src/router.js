import React from "react";
import { SafeAreaView, Image, View, Button, Dimensions, ScrollView } from "react-native";
import { createStackNavigator, createDrawerNavigator, createMaterialTopTabNavigator, DrawerItems } from "react-navigation";

import Welcome from "./screens/Login/Welcome";
import Register from "./screens/Login/Register";
import Login from "./screens/Login/Login";
import Home from "./screens/mainDrawer/Home";
import Exercises from "./screens/mainDrawer/exercise/Exercises";
import Program from "./screens/mainDrawer/workout/Program";
import Workout from "./screens/mainDrawer/workout/Workout";
import WorkLive from "./screens/mainDrawer/workout/WorkLive";
import Profile from "./screens/mainDrawer/Profile";
import Settings from "./screens/mainDrawer/Settings";
import Contact from "./screens/mainDrawer/Contact";
import Log from "./screens/mainDrawer/progress/Log";
import History from "./screens/mainDrawer/progress/History";

import LoginService from "./services/LoginService";

import Ionicons from "react-native-vector-icons/Ionicons";


export const TodayStack = createStackNavigator({
    Home: {
        screen: Home,
    },
    Workout: {
        screen: Workout,
    },
    WorkLive: {
        screen: WorkLive,
    },
},
    {
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
        initialRouteName: "Home"
    },
);

export const WorkoutTabNav = createMaterialTopTabNavigator({
    Home: {
        screen: TodayStack,
        navigationOptions: {
            tabBarLabel: "Todays Workout",
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
        initialRouteName: "Home",
    });

export const WorkoutStack = createStackNavigator({
    TabNavigator: {
        screen: WorkoutTabNav,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: "Workout",
            headerTitle: "Workout",
            headerMode: "screen",
            headerStyle: {
                backgroundColor: "#324151",
            },
            headerTintColor: "#9599a2",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerLeft: <Ionicons name="md-menu" style={{ padding: 10 }}
                size={35} color="#9599a2" onPress={() => navigation.openDrawer()}
            />
        })
    }
});

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
            style: { backgroundColor: "#324151" },
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
        navigationOptions: {
            gesturesEnabled: false,
        },
    });


export const ProgressStack = createStackNavigator({
    TabNavigator: {
        screen: ProgTabNav,
        navigationOptions: ({ navigation }) => ({
            drawerLabel: "Progress",
            headerTitle: "Progress",
            headerMode: "screen",
            headerStyle: {
                backgroundColor: "#324151",
            },
            headerTintColor: "#9599a2",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerLeft: <Ionicons name="md-menu" style={{ padding: 10 }}
                size={35} color="#9599a2" onPress={() => navigation.openDrawer()} />
        })
    }
});

export const ExerciseStack = createStackNavigator(
    {
        Exercises: {
            screen: Exercises,
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            initialRouteName: "Exercises",
            drawerLabel: "Exercises Guide",
            headerMode: "screen",
            headerTitle: "Exercise Guide",
            headerStyle: {
                backgroundColor: "#324151",
            },
            headerTintColor: "#9599a2",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerLeft: <Ionicons name="md-menu" style={{ padding: 10 }}
                size={35} color="#9599a2" onPress={() => navigation.openDrawer()} />
        }),
    }
);

export const ProfileStack = createStackNavigator(
    {
        Profile: {
            screen: Profile,
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            initialRouteName: "Profile",
            drawerLabel: "Profile",
            headerMode: "screen",
            headerTitle: "Profile",
            headerStyle: {
                backgroundColor: "#324151",
            },
            headerTintColor: "#9599a2",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerLeft: <Ionicons name="md-menu" style={{ padding: 10 }}
                size={35} color="#9599a2" onPress={() => navigation.openDrawer()} />
        }),
    }
);

export const ContactStack = createStackNavigator(
    {
        Contact: {
            screen: Contact,
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            initialRouteName: "Contact",
            drawerLabel: "Contact",
            headerMode: "screen",
            headerTitle: "Contact",
            headerStyle: {
                backgroundColor: "#324151",
            },
            headerTintColor: "#9599a2",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerLeft: <Ionicons name="md-menu" style={{ padding: 10 }}
                size={35} color="#9599a2" onPress={() => navigation.openDrawer()} />
        }),
    }
);

export const SettingsStack = createStackNavigator(
    {
        Settings: {
            screen: Settings,
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            initialRouteName: "Settings",
            drawerLabel: "Settings",
            headerMode: "screen",
            headerTitle: "Settings",
            headerStyle: {
                backgroundColor: "#324151",
            },
            headerTintColor: "#9599a2",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerLeft: <Ionicons name="md-menu" style={{ padding: 10 }}
                size={35} color="#9599a2" onPress={() => navigation.openDrawer()} />
        }),
    }
);

const { width } = Dimensions.get("window");

export const CustomDrawComp = (props) => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{
            height: 220, backgroundColor: "#9599a2",
            alignItems: "center", justifyContent: "center"
        }}>
            <Image source={require("../res/logo2.png")}
                style={{ height: 180, width: 220, borderRadius: 0 }} />
        </View>

        <ScrollView style={{ marginBottom: 50, backgroundColor: "#9599a2" }}>
            <DrawerItems {...props} />
            <Button
                color="#fe1a27"
                title="Log Out"
                onPress={() => LoginService.logout().then(() => this.props.navigation.navigate("Welcome"))}
            />
        </ScrollView>
    </SafeAreaView>
);

export const DrawNav = createDrawerNavigator({
    Workout: WorkoutStack,
    Exercises: ExerciseStack,
    Progress: ProgressStack,
    Profile: ProfileStack,
    Settings: SettingsStack,
    Contact: ContactStack,
},
    {
        contentComponent: CustomDrawComp,
        drawerWidth: width * .65,
    });

export const Auth = createStackNavigator(
    {
        Welcome: {
            screen: Welcome,
        },
        Register: {
            screen: Register,
        },
        Login: {
            screen: Login,
        },
        DrawNav: {
            screen: DrawNav,
        }
    },
    {
        navigationOptions: {
            gesturesEnabled: false,
            header: null,
        },
        initialRouteName: LoginService.isLoggedIn() ? "DrawNav" : "Welcome",
    },
);
