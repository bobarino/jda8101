import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container, Header, Content, Item, Input, Icon,
  Button, List, ListItem, Text
} from "native-base";
import firebase from 'react-native-firebase';


export default class Exercises extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('exercises');

    this.unsubscribe = null;
    this.state = {
      exers: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  onCollectionUpdate = (snap) => {
    const exers = [];
    snap.forEach((doc) => {
      const { exName, exStart, exAct, exType } = doc.data();

      exers.push({
        exName,
        exStart,
        exAct,
        exType,
      });
    });

    this.setState({
      exers,
      loading: false,
    });
  }


  render() {
    const list = this.state.exers;

    const exlist = list.map((x, i) => {
      return (
        <ListItem key={i}>
          <Text>{x.exName}</Text>
        </ListItem>
      )
    })

    return (
      <Container>
        <Header style={{ backgroundColor: '#324151' }} searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        <Content>
          <List>
            {exlist}
          </List>
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
