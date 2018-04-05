import { StackNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    headerMode: 'none',
  },
)

export default RootStackNavigator
