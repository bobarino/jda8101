import React, { Component } from "react";
import { Text } from "react-native";
import { Container, Content, Card, CardItem } from "native-base";
import LoginService from "../../../services/LoginService";


export default class Home extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
  };

  state = {
    currentUser: null
  }

  componentDidMount() {
    this.setState({ currentUser: LoginService.getCurrentUser() });
  }

  render() {
    // const { currentUser } = this.state
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>Today's Workout: </Text>
            </CardItem>
            <CardItem body>
              <Text>
                Mesocycle : RFD {"\n"}
                Week : A {"\n"}
                Day : 2
              </Text>
            </CardItem>
            <CardItem footer button onPress={() => this.props.navigation.navigate("Workout")}>
              <Text>
                View Workout
              </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>This Mesocycle: </Text>
            </CardItem>
            <CardItem body>
              <Text>
                Strength Linear{"\n"}
                The focus of this mesocycle is to build strength with a linear progerssion etc. {"\n"}
              </Text>
            </CardItem>
          </Card>


        </Content>
      </Container>

    );
  }
}