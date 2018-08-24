import React, {Component} from 'react';
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Title } from 'native-base';




export default class Workout
 extends Component {

  static navigationOptions = {
    drawerLabel: 'Todays workout',
  };

  render () {
      return(
        <Container>
          <Content>
            <Card>
              <CardItem>
                <Text>BBALL1SLA3</Text>
              </CardItem>
              <CardItem body>
                  <Text>
                    Strength Linear, Week A, Day 2
                  </Text>
              </CardItem>
            </Card>
            <Button
              title="START WORKOUT"
              onPress={() => this.props.navigation.navigate('WorkLive')}
            />
            <Text>
              Warm Up:
            </Text>
            <Card>
              <CardItem>
                <Text>Exercise 1</Text>
              </CardItem>
              <CardItem body>
                  <Text>
                    Sets/Time/Distance
                  </Text>
              </CardItem>
            </Card>
            <Text>
              Core Lifts:
            </Text>
            <Card>
              <CardItem>
                <Text>Exercise 2</Text>
              </CardItem>
              <CardItem body>
                  <Text>
                    Sets/Reps
                  </Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Text>Exercise 3</Text>
              </CardItem>
              <CardItem body>
                  <Text>
                    Sets/Reps
                  </Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Text>Exercise 4</Text>
              </CardItem>
              <CardItem body>
                  <Text>
                    Sets/Reps
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
