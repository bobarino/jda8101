import React, { Component } from "react";
import { Text, Button } from "react-native";
import { Container, Header, Content, Card, CardItem, Body, Title } from "native-base";




export default class WorkLive
  extends Component {

  static navigationOptions = {
    drawerLabel: "Live",
  };

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Exercise #</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Text>EXERCISE NAME</Text>
            </CardItem>
          </Card>
          <Text>
            3 sets
          </Text>
          <Text>
            Set 1: ____ reps  ____ pounds
          </Text>
          <Text>
            Set 2: ____ reps  ____ pounds
          </Text>
          <Text>
            Set 3: ____ reps  ____ pounds
          </Text>

        </Content>
        <Button
          title="Next"
          onPress={() => this.props.navigation.navigate("WorkLive")}
        />
      </Container>

    );
  }
}