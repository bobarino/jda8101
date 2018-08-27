import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, Platform, Image, Text, View,
  Button, Dimensions, ScrollView } from 'react-native';
import { createSwitchNavigator, createStackNavigator,
  createDrawerNavigator, createMaterialTopTabNavigator, DrawerItems } from 'react-navigation';
import firebase from 'react-native-firebase';


import Welcome from './components/login/Welcome';
import Register from './components/login/Register';
import Login from './components/login/Login';
import Home from './components/mainDrawer/Home';
import Exercises from './components/mainDrawer/exercise/Exercises';
import Program from './components/mainDrawer/workout/Program';
import Workout from './components/mainDrawer/workout/Workout';
import WorkLive from './components/mainDrawer/workout/WorkLive';
import Profile from './components/mainDrawer/Profile';
import Progress from './components/mainDrawer/Progress';
import Settings from './components/mainDrawer/Settings';
import Contact  from './components/mainDrawer/Contact';
import Log from './components/mainDrawer/progress/Log';
import History from './components/mainDrawer/progress/History';


import Ionicons from 'react-native-vector-icons/Ionicons';

handleLogout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => this.props.navigation.navigate('Welcome'))
}

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
    initialRouteName: 'Home'
  },
)

export const WorkoutTabNav = createMaterialTopTabNavigator({
  Home: {
    screen: TodayStack,
    navigationOptions: {
      tabBarLabel: 'Todays Workout',
    }
  },
  Program: {
    screen: Program,
    navigationOptions: {
      tabBarLabel: 'Your Program',
    }
  },
},
{
  tabBarOptions: {
    style: {
      backgroundColor: '#324151',
    },
    activeTintColor: '#fe1a27',
    inactiveTintColor: '#fff',
    labelStyle: {
      fontWeight: 'bold',
      fontSize: 16,
    },

    indicatorStyle: {
      backgroundColor: '#fe1a27'
    }
  },
  swipeEnabled: true,
  initialRouteName: 'Home',
});

export const WorkoutStack= createStackNavigator({
  TabNavigator:{
    screen: WorkoutTabNav,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Workout',
      headerTitle: 'Workout',
      headerMode: 'screen',
      headerStyle: {
        backgroundColor: '#324151',
      },
      headerTintColor: '#9599a2',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: <Ionicons name="md-menu" style={{padding:10}}
        size={35} color='#9599a2' onPress={() => navigation.openDrawer()} />
    })

  }
});

export const ProgTabNav = createMaterialTopTabNavigator({
  Log: {
    screen: Log,
    navigationOptions: {
      tabBarLabel: 'New Entry',
    }
  },
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'Training History',
    }
  },
},
{
  tabBarOptions: {
    style: {backgroundColor: '#324151'},
    activeTintColor: '#fe1a27',
    inactiveTintColor: '#fff',
    labelStyle: {
      fontWeight: 'bold',
      fontSize: 16,
    },

    indicatorStyle: {
      backgroundColor: '#fe1a27'
    }
  },
  swipeEnabled: true,
  initialRouteName: 'Log',
  navigationOptions: {
    gesturesEnabled: false,
  },
});


export const ProgressStack = createStackNavigator({
  TabNavigator:{
    screen: ProgTabNav,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Progress',
      headerTitle: 'Progress',
      headerMode: 'screen',
      headerStyle: {
        backgroundColor: '#324151',
      },
      headerTintColor: '#9599a2',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: <Ionicons name="md-menu" style={{padding:10}}
        size={35} color='#9599a2' onPress={() => navigation.openDrawer()} />
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
    navigationOptions: ({navigation}) => ({
      initialRouteName: 'Exercises',
      drawerLabel: 'Exercises Guide',
      headerMode: 'screen',
      headerTitle: 'Exercise Guide',
      headerStyle: {
        backgroundColor: '#324151',
      },
      headerTintColor: '#9599a2',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: <Ionicons name="md-menu" style={{padding:10}}
        size={35} color='#9599a2' onPress={() => navigation.openDrawer()} />
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
    navigationOptions: ({navigation}) => ({
      initialRouteName: 'Profile',
      drawerLabel: 'Profile',
      headerMode: 'screen',
      headerTitle: 'Profile',
      headerStyle: {
        backgroundColor: '#324151',
      },
      headerTintColor: '#9599a2',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: <Ionicons name="md-menu" style={{padding:10}}
        size={35} color='#9599a2' onPress={() => navigation.openDrawer()} />
    }),
  }
);

const {width} = Dimensions.get('window');

export const CustomDrawComp = (props) => (
  <SafeAreaView style={{flex:1}}>
    <View style={{ height: 220, backgroundColor: '#9599a2',
      alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('./components/mainDrawer/logo2.png')}
      style={{height: 180, width:220, borderRadius: 0}} />
    </View>

    <ScrollView style={{marginBottom: 50, backgroundColor: '#9599a2'}}>
      <DrawerItems {...props} />
      <Button
        color='#fe1a27'
        title="Log Out"
        onPress={this.handleLogout}
      />
    </ScrollView>



  </SafeAreaView>
)

export const DrawNav = createDrawerNavigator({
  Workout: WorkoutStack,
  Exercises: ExerciseStack,
  Progress: ProgressStack,
  Profile: ProfileStack,
  Settings: Settings,
  Contact: Contact,
},
{
  contentComponent: CustomDrawComp,
  drawerWidth: width*.65,
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
    initialRouteName: 'Welcome'
  },
);
