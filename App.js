import React, {Component} from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import {Auth} from './router';


export default class App extends Component {
  render() {
    return (
        <Auth />
    )
  }
}
