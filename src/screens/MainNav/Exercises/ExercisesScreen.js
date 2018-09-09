import React, { Component } from "react";
import {
  Container, Header, Content, Item, Input, Icon,
  List, ListItem, Text
} from "native-base";
import { createStackNavigator } from "react-navigation";

import Button from "../../../components/Button";
import Exercises from "../../../entities/Exercises";

import IndividualExercise from "./IndividualExercise";


class ExercisesList extends Component {
  constructor(props) {
    super(props);

    Exercises.getList().then((list) => this.setState({ exers: list, loading: false }));

    this.state = {
      exers: [],
      loading: true,
    };
  }


  render() {
    const list = this.state.exers;

    const exlist = list.map((x, i) => {
      return (
        <ListItem key={i}>
          <Button onPress={() => this.props.navigation.navigate("IndividualExercise", { exercise: x })}>
            <Text>{x.exName}</Text>
          </Button>
        </ListItem >
      );
    });

    return (
      <Container>
        <Header style={{ backgroundColor: "#324151" }} searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
          <Button>
            <Text>Search</Text>
          </Button>
        </Header>

        <Content>
          <List>
            {exlist}
          </List>
        </Content>
      </Container >
    );
  }
}

export default function ExcercisesScreen(navigationOptionsFunc) {
  return createStackNavigator(
    {
      ExercisesList: { screen: ExercisesList },
      IndividualExercise: { screen: IndividualExercise }
    },
    {
      navigationOptions: navigationOptionsFunc,
      InitialRouteName: "ExercisesList"
    }
  );
}
