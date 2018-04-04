import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons'
import { TabNavigator, TabBarBottom } from 'react-navigation'

import DashboardScreen from '../screens/DashboardScreen'
import Colors from '../constants/Colors'

const iconSize = 28

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
    width: 25,
  },
})

export default TabNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <FontAwesome
            name="dashboard"
            size={25}
            style={styles.icon}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        ),
      }),
    },
    Workouts: {
      screen: () => <View />,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name="run"
            size={25}
            style={styles.icon}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        ),
      }),
    },
    Community: {
      screen: () => <View />,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <MaterialIcons
            name="people"
            size={iconSize}
            style={styles.icon}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        ),
      }),
    },
    Settings: {
      screen: () => <View />,
      navigationOptions: () => ({
        tabBarIcon: ({ focused }) => (
          <Octicons
            name="gear"
            size={iconSize}
            style={styles.icon}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        ),
      }),
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
)
