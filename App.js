import React, {Component} from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Auth } from './router';

import { Font } from 'expo';


export default class App extends Component {
  componentDidMount() {
    Font.loadAsync({
      'Ionicons': require('./node_modules/react-native-vector-icons/Fonts/Ionicons.ttf'),
    });
  }
  render() {
    return (
        <Auth />
    )
  }
}
