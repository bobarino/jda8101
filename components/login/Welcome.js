import React, {Component} from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
// import firebase from 'react-native-firebase';


export default class Welcome extends Component {

  componentDidMount() {
    // firebase.auth().onAuthStateChanged(user => {
    //   this.props.navigation.navigate(user ? 'DrawNav' : 'Welcome')
    // })
    this.props.navigation.navigate('DrawNav');
  }

  // static navigationOptions = {
  //   header: 'none'
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome</Text>
        <Button title = 'Log in'
          onPress={()=>this.props.navigation.navigate('Login')}/>
        <Button title = 'Register'
          onPress={()=>this.props.navigation.navigate('Register')}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
