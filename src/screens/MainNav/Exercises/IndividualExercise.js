import React, { Component } from "react";
import {
  Container, Header, Content, Item, Input, Icon,
  Button, List, ListItem, Text
} from "native-base";
import Exercises from "../../../entities/Exercises";


export default class IndividualExercise extends Component {
  constructor(props) {
    super(props);

    Exercises.getList().then((list) => this.setState({ exers: list, loading: false }));

    this.state = {
      exers: [],
      loading: true,
    };
  }


  render() {
    const exercise = this.props.navigation.state.params.exercise;


    return (
      <Container>
        <Header style={{ backgroundColor: "#324151" }} searchBar rounded>
          <Text>{exercise.exName}</Text>
        </Header>
        <Content />
      </Container>
    );
  }
}