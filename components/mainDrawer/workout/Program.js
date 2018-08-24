import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Title } from 'native-base';
import firebase from 'react-native-firebase';




export default class Program
 extends Component {

  static navigationOptions = {
    drawerLabel: 'Your Program',
  };

  render () {
      return(
        <Container>

        <Content>
          <Card>
            <CardItem>
              <Text>Sport: Basketball</Text>
            </CardItem>
            <CardItem body>
                <Text>
                  Level: 2
                </Text>
            </CardItem>
          </Card>
          <Text>
            This week: 7/15/79
          </Text>
          <Text>
            Mesocycle: Strength Linear
          </Text>
          <Text>
            Schedule for this week:
          </Text>
          <Card>
            <CardItem>
              <Text>Day 1: Workout</Text>
            </CardItem>
            <CardItem body>
                <Text>
                  This is your workout for day 1
                </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Day 2: Workout</Text>
            </CardItem>
            <CardItem body>
                <Text>
                  This is your workout for day 2
                </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Day 3: Workout</Text>
            </CardItem>
            <CardItem body>
                <Text>
                  This is your workout for day 3
                </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Day 4: Workout</Text>
            </CardItem>
            <CardItem body>
                <Text>
                  This is your workout for day 4
                </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Day 5: Workout</Text>
            </CardItem>
            <CardItem body>
                <Text>
                  This is your workout for day 5
                </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Day 6: Workout</Text>
            </CardItem>
            <CardItem body>
                <Text>
                  This is your workout for day 6
                </Text>
            </CardItem>
          </Card>


        </Content>
      </Container>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
